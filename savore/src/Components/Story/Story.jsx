import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCheckCircle, FiCompass } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left Image Collage Animation
      gsap.from('.story-image-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Right Content Animation
      gsap.from('.story-content-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    'Sourced directly from local organic farmers',
    'Traditional recipes with modern culinary technique',
    'Zero-waste kitchen practices & sustainability',
  ];

  return (
    <section 
      id="story" 
      ref={sectionRef} 
      className="py-32 bg-neutral-950 text-white px-6 md:px-12 relative overflow-hidden scroll-mt-12 border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Image Visual Collage */}
        <div className="story-image-anim relative grid grid-cols-12 gap-4" style={{ willChange: 'transform, opacity' }}>
          <div className="col-span-8 overflow-hidden rounded-3xl border border-neutral-800 shadow-2xl h-96">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800" 
              alt="Restaurant interior ambiance" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="col-span-4 overflow-hidden rounded-3xl border border-neutral-800 shadow-2xl h-64 mt-16">
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800" 
              alt="Chef preparing dish" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Floating Badge */}
          <div className="absolute -bottom-6 left-12 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <FiCompass className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Established</p>
              <p className="text-lg font-serif font-bold text-white">Since 2018</p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Content */}
        <div className="story-content-anim flex flex-col justify-center" style={{ willChange: 'transform, opacity' }}>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-amber-500"></span>
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
              Our Heritage & Soul
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">
            A Passion for <span className="italic text-amber-400 font-normal">Authentic</span> Flavors
          </h2>

          <p className="text-neutral-400 font-light text-base leading-relaxed mb-6">
            At Savore, we believe that exceptional dining begins long before food touches the plate. It starts in the rich soil of our partner farms, the unhurried care of our growers, and a deep-rooted respect for nature's seasonal rhythms.
          </p>

          <p className="text-neutral-400 font-light text-base leading-relaxed mb-8">
            Our culinary team blends time-honored artisanal traditions with progressive techniques, turning simple, sustainably harvested ingredients into unforgettable sensory experiences.
          </p>

          {/* Bullet Highlights */}
          <div className="space-y-4 mb-10">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <FiCheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-neutral-300 font-light text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>

          {/* Action / Quote Signature */}
          <div className="pt-6 border-t border-neutral-900 flex items-center justify-between">
            <div>
              <p className="text-white font-serif font-bold text-lg">Julian Vance</p>
              <p className="text-neutral-400 text-xs tracking-wider uppercase">Executive Chef & Founder</p>
            </div>
            <span className="font-serif italic text-2xl text-amber-500/60">Julian Vance</span>
          </div>

        </div>

      </div>
    </section>
  );
}