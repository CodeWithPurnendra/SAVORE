import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { FiArrowRight, FiSun } from 'react-icons/fi';

gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered slide-in for peaceful editorial elements
      gsap.from('.peace-anim', {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      gsap.to(window, {
        scrollTo: { y: targetElement, offsetY: 80 },
        duration: 1.2,
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen bg-neutral-950 text-white flex items-center justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Soft warm ambient lighting for a calm, organic mood */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Peaceful Messaging */}
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          
          <div className="peace-anim inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-md mb-6">
            <FiSun className="w-4 h-4 text-amber-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-300 font-medium">
              Slow Living &amp; Fine Dining
            </span>
          </div>

          <h1 className="peace-anim text-5xl sm:text-6xl xl:text-7xl font-serif font-bold tracking-tight mb-6 leading-[1.15]">
            Find Calm in Every <br />
            <span className="italic font-normal text-amber-400">Thoughtful</span> Meal.
          </h1>

          <p className="peace-anim text-neutral-400 text-base sm:text-lg max-w-xl font-light leading-relaxed mb-10">
            Escape the rush. Step into a sanctuary of natural ingredients, quiet elegance, and unhurried culinary artistry inspired by the tranquility of nature.
          </p>

          <div className="peace-anim flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#menu"
              onClick={(e) => handleScrollTo(e, '#menu')}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold tracking-wider uppercase text-sm rounded-full transition-all duration-300 shadow-xl hover:shadow-amber-500/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Explore Menu 
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#story"
              onClick={(e) => handleScrollTo(e, '#story')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500 text-neutral-300 font-semibold tracking-wider uppercase text-sm rounded-full transition-all duration-300 cursor-pointer"
            >
              Our Philosophy
            </a>
          </div>

        </div>

        {/* Right Column: Pure Food Imagery Collage */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="peace-anim relative w-full max-w-md lg:max-w-none h-[460px] sm:h-[520px]">
            
            {/* Main Fine Food Image */}
            <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=900"
                alt="Exquisite gourmet dish"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Overlapping Secondary Food Image */}
            <div className="absolute bottom-4 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden border-4 border-neutral-950 shadow-2xl z-20">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=700"
                alt="Fresh organic food plate"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}