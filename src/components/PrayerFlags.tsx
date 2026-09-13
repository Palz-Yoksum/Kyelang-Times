import React from 'react';

interface PrayerFlagsProps {
  density?: 'compact' | 'normal' | 'full';
  showString?: boolean;
  className?: string;
}

export const PrayerFlags: React.FC<PrayerFlagsProps> = () => {
  // Completely removed per user request: "remove the tibetian flags design"
  return null;
};
