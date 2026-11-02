import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { FiMenu, FiX, FiShoppingBag, FiCoffee, FiUser } from 'react-icons/fi';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

export default function NavBar({ onOpenBooking, onOpenCart, onOpenAuth, cartCount = 0, user = null }) {
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

  // Helper handlers for triggering modals and closing mobile drawer
  const handleBookingClick = () => {
    setIsOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    }
  };

  const handleCartClick = () => {
    setIsOpen(false);
    if (onOpenCart) {
      onOpenCart();
    }
  };

  const handleAuthClick = () => {
    setIsOpen(false);
    if (onOpenAuth) {
      onOpenAuth();
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
          
          {/* Cart Button */}
          <button 
            type="button"
            onClick={handleCartClick}
            className="relative p-2 text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
            title="View Cart"
          >
            <FiShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 text-neutral-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account / Login Button */}
          <button
            type="button"
            onClick={handleAuthClick}
            className="flex items-center gap-2 px-3 py-2 text-neutral-300 hover:text-amber-400 transition-colors border border-neutral-800 hover:border-amber-500/50 rounded-full text-sm cursor-pointer"
            title={user ? user.name : "Account Login"}
          >
            <FiUser className="w-4 h-4 text-amber-500" />
            <span className="max-w-[100px] truncate">{user ? user.name : 'Sign In'}</span>
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
            <button 
              type="button"
              onClick={handleCartClick}
              className="flex items-center gap-2 text-neutral-300 cursor-pointer"
            >
              <FiShoppingBag className="w-5 h-5 text-amber-500" />
              <span>Cart ({cartCount})</span>
            </button>

            <button 
              type="button"
              onClick={handleAuthClick}
              className="flex items-center gap-2 text-neutral-300 cursor-pointer"
            >
              <FiUser className="w-5 h-5 text-amber-500" />
              <span>{user ? user.name : 'Sign In'}</span>
            </button>
          </div>

          {/* Mobile Book Table Button */}
          <button
            type="button"
            onClick={handleBookingClick}
            className="w-full mt-2 py-3 bg-amber-500 text-neutral-950 font-semibold text-sm tracking-wider uppercase rounded-full cursor-pointer active:scale-95 text-center"
          >
            Book Table
          </button>
        </div>
      )}
    </nav>
  );
}