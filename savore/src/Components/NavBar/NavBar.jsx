import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { FiMenu, FiX, FiShoppingBag, FiCoffee } from 'react-icons/fi';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

export default function NavBar({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance animation on load
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  // Custom GSAP Smooth Scroll handler with offset support for fixed header
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile drawer if open

    if (targetId === '#') {
      gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power3.inOut' });
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      gsap.to(window, {
        scrollTo: { y: targetElement, offsetY: 80 }, // Account for fixed navbar height
        duration: 1.2,
        ease: 'power3.inOut',
      });
    }
  };

  // Helper handler for triggering modal and closing mobile drawer
  const handleBookingClick = () => {
    setIsOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    }
  };

  // Relevant anchor links matching your restaurant sections
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Our Story', href: '#story' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/85 backdrop-blur-md py-4 border-b border-neutral-800 shadow-xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a 
          href="#" 
          onClick={(e) => handleScrollTo(e, '#')} 
          className="flex items-center gap-2 group cursor-pointer"
        >
          <FiCoffee className="w-6 h-6 text-amber-500 transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-2xl font-serif tracking-widest text-white font-bold">
            SAVOR<span className="text-amber-500">E</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-neutral-300 hover:text-amber-400 font-medium tracking-wide transition-colors text-sm uppercase cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="relative p-2 text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer">
            <FiShoppingBag className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 text-neutral-950 text-[10px] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </button>
          
          {/* Desktop Book Table Button */}
          <button
            type="button"
            onClick={handleBookingClick}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-sm tracking-wider uppercase rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/20 cursor-pointer active:scale-95"
          >
            Book Table
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-neutral-300 hover:text-amber-400 focus:outline-none cursor-pointer"
        >
          {isOpen ? <FiX className="w-7 h-7" /> : <FiMenu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 py-6 px-8 flex flex-col gap-4 md:hidden shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-neutral-300 hover:text-amber-400 font-medium text-lg tracking-wide py-2 border-b border-neutral-900 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between pt-4">
            <button className="flex items-center gap-2 text-neutral-300 cursor-pointer">
              <FiShoppingBag className="w-5 h-5 text-amber-500" />
              <span>Cart (0)</span>
            </button>

            {/* Mobile Book Table Button */}
            <button
              type="button"
              onClick={handleBookingClick}
              className="px-5 py-2.5 bg-amber-500 text-neutral-950 font-semibold text-sm tracking-wider uppercase rounded-full cursor-pointer active:scale-95"
            >
              Book Table
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}