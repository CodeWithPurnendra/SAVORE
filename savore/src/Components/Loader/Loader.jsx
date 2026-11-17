import React from 'react';

export default function Loader({ fullScreen = true, text = "SAVORE" }) {
  return (
    <div 
      className={`${
        fullScreen ? 'fixed inset-0 z-50' : 'w-full h-full min-h-[300px]'
      } bg-[#171512] flex flex-col items-center justify-center transition-opacity duration-700`}
      role="status"
      aria-label="Loading"
    >
      <div className="relative w-[88px] h-[88px] flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-[1.5px] border-[#D4AF37]/15 border-t-[#D4AF37] border-r-[#D4AF37]/50 animate-spin" style={{ animationDuration: '1.6s', animationTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)' }} />
        
        {/* Inner reverse-rotating ring */}
        <div className="absolute inset-2 rounded-full border-[1px] border-[#D4AF37]/10 border-b-[#D4AF37]" style={{ animation: 'spin 2.2s linear infinite reverse' }} />
        
        {/* Monogram */}
        <span className="font-serif text-[32px] font-bold text-[#D4AF37] tracking-[0.05em] animate-pulse">
          S
        </span>
      </div>
      
      {text && (
        <div className="mt-[22px] font-sans text-[11px] font-medium tracking-[0.45em] uppercase text-[#D4AF37]/85 pl-[0.45em]">
          {text}
        </div>
      )}
    </div>
  );
}