import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiCheckCircle, 
  FiClock, 
  FiSun 
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Entrance Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-anim',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated API submission delay (Replace this with your Express POST request later!)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="py-32 bg-neutral-950 text-white px-6 md:px-12 relative overflow-hidden scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="contact-anim inline-flex items-center gap-2 mb-3">
            <FiSun className="w-4 h-4 text-amber-500" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium">
              Get In Touch
            </span>
          </div>
          <h2 className="contact-anim text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
            Reserve a <span className="italic text-amber-400 font-normal">Table</span> or <span className="italic text-amber-400 font-normal">Reach Out</span>
          </h2>
          <p className="contact-anim text-neutral-400 font-light text-sm md:text-base">
            Have a question about our menu, private dining, or catering? Send us a message and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="contact-anim bg-neutral-900/40 border border-neutral-800/80 p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                Information & Hours
              </h3>

              <div className="space-y-4 text-sm font-light">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-0.5">Location</h4>
                    <p className="text-neutral-400">124 Culinary Boulevard, Gourmet Avenue, City</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-0.5">Reservations & Phone</h4>
                    <p className="text-neutral-400 font-mono">+1 (555) 234-5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-0.5">Direct Email</h4>
                    <p className="text-neutral-400 font-mono">contact@savorygourmet.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-0.5">Operating Hours</h4>
                    <p className="text-neutral-400">Mon - Thu: 5:00 PM - 10:30 PM</p>
                    <p className="text-neutral-400">Fri - Sun: 4:30 PM - 11:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note Card */}
            <div className="contact-anim bg-gradient-to-br from-amber-500/10 via-neutral-900/60 to-neutral-950 border border-amber-500/20 p-6 rounded-3xl">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                Private Events
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Planning a corporate dinner or private celebration? Mention it in your message or select "Private Dining" for customized menu options.
              </p>
            </div>

          </div>

          {/* Form Section */}
          <div className="lg:col-span-7">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact-anim bg-neutral-900/50 border border-neutral-800/80 p-8 md:p-10 rounded-3xl shadow-2xl relative"
            >
              {isSubmitted && (
                <div className="absolute inset-0 bg-neutral-900/95 backdrop-blur-md rounded-3xl z-20 flex flex-col items-center justify-center text-center p-8 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4">
                    <FiCheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">Message Delivered</h3>
                  <p className="text-neutral-400 text-xs max-w-sm">
                    Thank you for reaching out! We have received your inquiry and will respond shortly.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider font-semibold text-neutral-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-neutral-950/80 border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-amber-500/60 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-neutral-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-neutral-950/80 border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-amber-500/60 transition-colors"
                  />
                </div>

              </div>

              {/* Subject */}
              <div className="space-y-2 mb-6">
                <label htmlFor="subject" className="text-xs uppercase tracking-wider font-semibold text-neutral-300">
                  Inquiry Type
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-950/80 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/60 transition-colors cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Table Reservation">Table Reservation</option>
                  <option value="Private Dining">Private Dining & Events</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2 mb-8">
                <label htmlFor="message" className="text-xs uppercase tracking-wider font-semibold text-neutral-300">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your request..."
                  className="w-full px-4 py-3 bg-neutral-950/80 border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-amber-500/60 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase text-xs tracking-[0.2em] rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-amber-500/10 flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}