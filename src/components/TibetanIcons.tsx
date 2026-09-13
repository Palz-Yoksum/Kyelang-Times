import React from 'react';

// Tibetan Endless Knot (Shrivatsa) - Symbol of infinite wisdom, compassion, and interconnectedness
export const EndlessKnotIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30 15 L50 35 L70 15 L85 30 L65 50 L85 70 L70 85 L50 65 L30 85 L15 70 L35 50 L15 30 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinejoin="round"
    />
    <path
      d="M40 25 L50 35 L60 25 L70 35 L60 45 L70 55 L60 65 L50 55 L40 65 L30 55 L40 45 L30 35 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="50" r="4" fill="currentColor" />
  </svg>
);

// Tibetan Dragon (Druk) - Symbol of high-altitude strength, thunderous wisdom & divine guardianship
export const TibetanDragonIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 120 120"
    fill="currentColor"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Stylized Tibetan Dragon Head & Crest */}
    <path
      d="M95 30 C90 20, 75 18, 65 24 C55 18, 45 22, 40 30 C30 32, 22 42, 25 54 C28 65, 38 70, 48 68 C52 75, 62 82, 72 80 C82 78, 88 68, 92 60 C98 52, 100 40, 95 30 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
    />
    {/* Dragon Whiskers and Horns */}
    <path
      d="M80 20 Q95 8 105 18 Q110 28 95 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M72 18 Q80 5 90 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Dragon Eyes & Snout */}
    <circle cx="82" cy="36" r="3.5" fill="currentColor" />
    <circle cx="70" cy="38" r="2.5" fill="currentColor" />
    {/* Dragon Claws & Swirling Body Scales */}
    <path
      d="M48 68 C40 78, 30 85, 20 80 C12 75, 10 65, 18 58 C24 52, 32 55, 38 52"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M58 80 C60 95, 75 105, 90 100 C102 95, 105 82, 98 72 C92 65, 85 68, 80 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Flaming Jewel Pearl (Cintamani) */}
    <circle cx="98" cy="45" r="5" fill="currentColor" opacity="0.9" />
    <path d="M98 38 Q103 42 98 46 Q93 42 98 38" fill="currentColor" />
  </svg>
);

// Tibetan Dharma Wheel (Dharmachakra)
export const DharmaWheelIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="5" />
    <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
    {/* 8 Spokes */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1="50"
        y1="50"
        x2={50 + 32 * Math.cos((angle * Math.PI) / 180)}
        y2={50 + 32 * Math.sin((angle * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="3.5"
      />
    ))}
  </svg>
);

// Tibetan Cloud Swirl / Lotus Accent
export const TibetanCloudDivider: React.FC<{ className?: string }> = ({ className = "w-32 h-6" }) => (
  <svg
    viewBox="0 0 200 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 20 C25 10, 45 10, 60 22 C75 35, 95 35, 100 20 C105 35, 125 35, 140 22 C155 10, 175 10, 190 20"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="100" cy="20" r="4" fill="currentColor" />
    <circle cx="80" cy="22" r="2.5" fill="currentColor" />
    <circle cx="120" cy="22" r="2.5" fill="currentColor" />
  </svg>
);
