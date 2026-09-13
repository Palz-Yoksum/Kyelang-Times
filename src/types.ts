export interface RoomItem {
  id: string;
  name: string;
  category: 'dragon_boutique' | 'hostel_dorm';
  tagline: string;
  capacity: string;
  bedConfig: string;
  floor: string;
  view: string;
  pricePerNight: string;
  originalPrice?: string;
  description: string;
  highlights: string[];
  amenities: string[];
  images: string[];
  badge?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'all' | 'dragon-room-1' | 'dragon-room-2' | 'dragon-rooms' | 'hostel-dorm' | 'glaciers' | 'dining' | 'buddhist-art' | 'keylong';
  categoryLabel: string;
  src: string;
  caption: string;
  aspect?: string;
  roomId?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  localName?: string;
  category: 'tibetan' | 'indian' | 'beverages';
  description: string;
  isSpecialty?: boolean;
  veg: boolean;
  price: string;
  tags?: string[];
  image: string;
}

export interface AmenityItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  isHeroFeature?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickAction?: string;
}

export interface QuickInquiry {
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  phone: string;
  specialRequests?: string;
}
