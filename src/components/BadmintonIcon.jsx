import React from 'react';

export function BadmintonIcon({ size = 24, className = '', color = 'currentColor', fill = 'none' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={fill} 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`badminton-svg-icon ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Shuttlecock cork base */}
      <path d="M12 21a2.5 2.5 0 0 0 2.5-2.5V17h-5v1.5A2.5 2.5 0 0 0 12 21z" fill={color} fillOpacity="0.25" />
      {/* Feather ribs */}
      <path d="M6.5 5.5L9.5 17" />
      <path d="M17.5 5.5L14.5 17" />
      <path d="M12 4v13" />
      <path d="M9.5 5L11 17" />
      <path d="M14.5 5L13 17" />
      {/* Feather bands */}
      <path d="M5.5 6c4-2 9-2 13 0" />
      <path d="M7.5 11c3-1.2 6-1.2 9 0" />
    </svg>
  );
}

export function RacketIcon({ size = 24, className = '', color = 'currentColor' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`racket-svg-icon ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Racket oval frame */}
      <ellipse cx="15" cy="9" rx="6" ry="7.5" transform="rotate(-45 15 9)" fill={color} fillOpacity="0.15" />
      {/* String grid lines */}
      <line x1="12.5" y1="5.5" x2="17.5" y2="10.5" strokeWidth="1.2" opacity="0.6" />
      <line x1="10.5" y1="7.5" x2="15.5" y2="12.5" strokeWidth="1.2" opacity="0.6" />
      <line x1="12" y1="12.5" x2="17" y2="7.5" strokeWidth="1.2" opacity="0.6" />
      <line x1="14" y1="14.5" x2="19" y2="9.5" strokeWidth="1.2" opacity="0.6" />
      {/* Shaft */}
      <line x1="9.7" y1="14.3" x2="6.2" y2="17.8" strokeWidth="2.5" />
      {/* Handle Grip */}
      <line x1="6.2" y1="17.8" x2="3.2" y2="20.8" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}
