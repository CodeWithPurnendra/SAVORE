import React, { useState, useEffect, useRef, useLayoutEffect, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiSun, FiX, FiCheck, FiGrid, FiClock, FiPlus, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// Sharp Image Component
const SharpImage = memo(({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-neutral-900 overflow-hidden">
      {!loaded && <div className="absolute inset-0 bg-neutral-800 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
});

// Optimized Smooth Dish Card
const DishCard = memo(({ dish, onSelect, onOrder }) => {
  return (
    <div
      onClick={() => onSelect(dish)}
      className="dish-card bg-neutral-900/50 border border-neutral-800/80 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between group cursor-pointer relative transform-gpu hover:-translate-y-1"
      style={{ willChange: 'transform' }}
    >
      {/* Image Header */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900">
        <SharpImage src={dish.image} alt={dish.name} />
        <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-amber-400 font-mono font-bold text-xs tracking-wider z-10">
          {dish.price}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <span className="card-text-anim text-[10px] uppercase tracking-widest text-amber-500/80 font-semibold mb-1.5 block">
          {dish.category}
        </span>
        <h3 className="card-text-anim text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors duration-200 mb-2 line-clamp-1">
          {dish.name}
        </h3>
        <p className="card-text-anim text-neutral-400 text-xs font-light leading-relaxed line-clamp-2">
          {dish.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="card-text-anim px-6 pb-6 pt-2 border-t border-neutral-800/60 flex items-center justify-between">
        <span className="text-xs text-neutral-400 flex items-center gap-1.5 font-mono">
          <FiClock className="w-3.5 h-3.5 text-amber-500" /> {dish.prepTime}
        </span>
        <button
          onClick={(e) => onOrder(dish.name, e)}
          className="w-10 h-10 rounded-full bg-neutral-800/80 group-hover:bg-amber-500 text-neutral-300 group-hover:text-neutral-950 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90"
        >
          <FiPlus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
});

function DishCardLoader() {
  return (
    <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between animate-pulse">
      <div className="w-full aspect-[16/10] bg-neutral-800/80" />
      <div className="p-6 space-y-3">
        <div className="h-6 bg-neutral-800/80 rounded-lg w-3/4" />
        <div className="h-4 bg-neutral-800/40 rounded-lg w-full" />
        <div className="h-4 bg-neutral-800/40 rounded-lg w-2/3" />
      </div>
      <div className="px-6 pb-6 pt-2 border-t border-neutral-800/60 flex items-center justify-between">
        <div className="h-4 bg-neutral-800/60 rounded-md w-20" />
        <div className="w-10 h-10 rounded-full bg-neutral-800" />
      </div>
    </div>
  );
}

export default function FeaturedDishes() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Seafood');
  
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [orderNotification, setOrderNotification] = useState(null);

  const categories = ['Seafood', 'Pasta', 'Vegetarian', 'Dessert', 'Starter'];

  useEffect(() => {
    let isMounted = true;
    
    async function fetchCategoryDishes() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`
        );
        const data = await response.json();

        if (data.meals && isMounted) {
          const formatted = data.meals.map((meal) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            category: activeCategory,
            price: `$${(Math.floor(Math.random() * 15) + 20).toString()}`,
            description: `A gourmet ${activeCategory.toLowerCase()} creation crafted with fresh seasonal ingredients.`,
            calories: `${Math.floor(Math.random() * 250) + 350} kcal`,
            prepTime: `${Math.floor(Math.random() * 20) + 15} mins`,
            image: meal.strMealThumb,
          }));
          setDishes(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch category images:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCategoryDishes();

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  // Header Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.header-text-anim',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth Card Text Reveal
  useLayoutEffect(() => {
    if (loading || dishes.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card-text-anim',
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.03,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading, dishes]);

  const handleOrder = (dishName, e) => {
    e.stopPropagation();
    setOrderNotification(dishName);
    setTimeout(() => setOrderNotification(null), 3000);
  };

  const featuredDishes = dishes.slice(0, 3);
  const modalDishes = dishes.slice(3);

  return (
    <section id="menu" ref={sectionRef} className="py-32 bg-neutral-950 text-white px-6 md:px-12 relative overflow-hidden scroll-mt-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="header-text-anim inline-flex items-center gap-2 mb-3">
            <FiSun className="w-4 h-4 text-amber-500" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium">
              Seasonal Selections
            </span>
          </div>
          <h2 className="header-text-anim text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
            Curated <span className="italic text-amber-400 font-normal">Creations</span>
          </h2>
          <p className="header-text-anim text-neutral-400 font-light text-sm md:text-base">
            Select a category to view fresh options from our API feed.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                if (category !== activeCategory) {
                  setActiveCategory(category);
                }
              }}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800/80 hover:border-neutral-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div ref={containerRef} className="min-h-[520px]">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <DishCardLoader />
              <DishCardLoader />
              <DishCardLoader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onSelect={setSelectedDish}
                  onOrder={handleOrder}
                />
              ))}
            </div>
          )}
        </div>

        {/* Redesigned Premium CTA Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setIsFullMenuOpen(true)}
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 hover:border-amber-500/50 rounded-full transition-all duration-300 cursor-pointer shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-0.5 active:translate-y-0"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Icon Indicator */}
            <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors duration-300">
              <FiGrid className="w-3.5 h-3.5" />
            </div>

            {/* Main Label */}
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-200 group-hover:text-white transition-colors">
              Explore More {activeCategory}
            </span>

            {/* Item Counter Pill */}
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-[10px] font-mono text-amber-400 group-hover:border-amber-500/40 transition-colors">
              +{modalDishes.length}
            </span>

            {/* Arrow Indicator */}
            <FiArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300 ml-1" />
          </button>
        </div>

      </div>

      {/* Full Category Modal */}
      {isFullMenuOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-4xl w-full h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/50">
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">More {activeCategory} Creations</h3>
                <p className="text-xs text-neutral-400 mt-1">Showing remaining items in this category</p>
              </div>
              <button onClick={() => setIsFullMenuOpen(false)} className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-amber-500 hover:text-neutral-950 transition-colors cursor-pointer">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {modalDishes.length > 0 ? (
                modalDishes.map((dish) => (
                  <div key={dish.id} onClick={() => setSelectedDish(dish)} className="bg-neutral-950 p-4 rounded-2xl flex gap-4 cursor-pointer hover:border-amber-500/40 border border-neutral-800 transition-colors group">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <SharpImage src={dish.image} alt={dish.name} />
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-serif font-bold text-white text-base line-clamp-1 group-hover:text-amber-400 transition-colors">{dish.name}</h4>
                        <span className="text-amber-400 font-mono font-bold text-xs">{dish.price}</span>
                      </div>
                      <span className="text-[10px] uppercase text-neutral-500 tracking-wider">Click for details &rarr;</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 py-12 text-center text-neutral-500 text-sm">
                  All available items for this category are currently displayed on the main menu.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center px-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <button onClick={() => setSelectedDish(null)} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-neutral-950/80 text-white flex items-center justify-center hover:bg-amber-500 hover:text-neutral-950 transition-colors cursor-pointer">
              <FiX className="w-5 h-5" />
            </button>
            <div className="w-full h-64">
              <SharpImage src={selectedDish.image} alt={selectedDish.name} />
            </div>
            <div className="p-6">
              <span className="text-xs uppercase text-amber-400 font-semibold">{selectedDish.category}</span>
              <h3 className="text-2xl font-serif font-bold text-white my-2">{selectedDish.name}</h3>
              <p className="text-neutral-400 text-xs leading-relaxed mb-6">{selectedDish.description}</p>
              <button 
                onClick={(e) => { handleOrder(selectedDish.name, e); setSelectedDish(null); }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase text-xs rounded-xl transition-colors cursor-pointer"
              >
                Order Dish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {orderNotification && (
        <div className="fixed bottom-8 right-8 z-50 bg-neutral-900 border border-amber-500/40 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
            <FiCheck className="w-4 h-4" />
          </div>
          <span className="text-sm">Added {orderNotification} to order list</span>
        </div>
      )}
    </section>
  );
}