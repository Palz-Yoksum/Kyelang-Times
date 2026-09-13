import React, { createContext, useContext, useState, useEffect } from 'react';
import { GalleryPhoto } from '../types';
import {
  GALLERY_PHOTOS,
  ROOMS,
  HOTEL_INFO,
  ALTITUDE_AMENITIES,
  MENU_ITEMS,
  TRAVEL_TIPS,
} from '../data/hotelData';

const STORAGE_KEY = 'kyelang_homestay_custom_photos_v6';
const DEFAULT_HERO_IMAGE = '/images/hero-bg.jpg';
const DEFAULT_LOGO_IMAGE = '/images/logo.jpg';

interface PhotoContextType {
  galleryPhotos: GalleryPhoto[];
  heroImage: string;
  logoImage: string;
  roomImages: Record<string, string[]>;
  isManagerOpen: boolean;
  openManager: (targetTab?: 'upload' | 'manage', defaultDestination?: string) => void;
  closeManager: () => void;
  managerTargetDestination?: string;
  managerActiveTab: 'upload' | 'manage';
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  addMultipleGalleryPhotos: (photos: Omit<GalleryPhoto, 'id'>[]) => void;
  deleteGalleryPhoto: (id: string) => void;
  setHeroImage: (url: string) => void;
  setLogoImage: (url: string) => void;
  addRoomPhoto: (roomId: string, url: string, keepCoverPhoto?: boolean) => void;
  addMultipleRoomPhotos: (roomId: string, urls: string[], keepCoverPhoto?: boolean) => void;
  removeRoomPhoto: (roomId: string, index: number) => void;
  setRoomCoverPhoto: (roomId: string, index: number) => void;
  reorderRoomPhotos: (roomId: string, fromIndex: number, toIndex: number) => void;
  setRoomPhotos: (roomId: string, urls: string[]) => void;
  resetAllPhotosToDefault: () => void;
  generatePermanentDataCode: () => string;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Build initial room images dictionary from default ROOMS in hotelData.ts
  const initialRoomImages: Record<string, string[]> = {};
  ROOMS.forEach((room) => {
    initialRoomImages[room.id] = [...room.images];
  });

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(GALLERY_PHOTOS);
  const [heroImage, setHeroImageState] = useState<string>(DEFAULT_HERO_IMAGE);
  const [logoImage, setLogoImageState] = useState<string>(DEFAULT_LOGO_IMAGE);
  const [roomImages, setRoomImages] = useState<Record<string, string[]>>(initialRoomImages);

  // Modal UI state
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [managerActiveTab, setManagerActiveTab] = useState<'upload' | 'manage'>('upload');
  const [managerTargetDestination, setManagerTargetDestination] = useState<string | undefined>(undefined);

  const openManager = (targetTab: 'upload' | 'manage' = 'upload', defaultDestination?: string) => {
    setManagerActiveTab(targetTab);
    setManagerTargetDestination(defaultDestination);
    setIsManagerOpen(true);
  };

  const closeManager = () => {
    setIsManagerOpen(false);
  };

  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `custom-g-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setGalleryPhotos((prev) => [newPhoto, ...prev]);
  };

  const addMultipleGalleryPhotos = (photos: Omit<GalleryPhoto, 'id'>[]) => {
    const newPhotos: GalleryPhoto[] = photos.map((photo, idx) => ({
      ...photo,
      id: `custom-g-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
    }));
    setGalleryPhotos((prev) => [...newPhotos, ...prev]);
  };

  const deleteGalleryPhoto = (id: string) => {
    setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const setHeroImage = (url: string) => {
    setHeroImageState(url);
  };

  const setLogoImage = (url: string) => {
    setLogoImageState(url);
  };

  const addRoomPhoto = (roomId: string, url: string, keepCoverPhoto = true) => {
    setRoomImages((prev) => {
      const current = prev[roomId] || [];
      if (current.length === 0) {
        return { ...prev, [roomId]: [url] };
      }
      if (keepCoverPhoto) {
        return {
          ...prev,
          [roomId]: [current[0], url, ...current.slice(1)],
        };
      }
      return {
        ...prev,
        [roomId]: [url, ...current],
      };
    });
  };

  const addMultipleRoomPhotos = (roomId: string, urls: string[], keepCoverPhoto = true) => {
    setRoomImages((prev) => {
      const current = prev[roomId] || [];
      if (current.length === 0) {
        return { ...prev, [roomId]: urls };
      }
      if (keepCoverPhoto) {
        return {
          ...prev,
          [roomId]: [current[0], ...urls, ...current.slice(1)],
        };
      }
      return {
        ...prev,
        [roomId]: [...urls, ...current],
      };
    });
  };

  const setRoomCoverPhoto = (roomId: string, index: number) => {
    setRoomImages((prev) => {
      const current = prev[roomId] || [];
      if (!current[index]) return prev;
      const targetPhoto = current[index];
      const remaining = current.filter((_, idx) => idx !== index);
      return {
        ...prev,
        [roomId]: [targetPhoto, ...remaining],
      };
    });
  };

  const reorderRoomPhotos = (roomId: string, fromIndex: number, toIndex: number) => {
    setRoomImages((prev) => {
      const current = [...(prev[roomId] || [])];
      if (fromIndex < 0 || fromIndex >= current.length || toIndex < 0 || toIndex >= current.length) {
        return prev;
      }
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return {
        ...prev,
        [roomId]: current,
      };
    });
  };

  const setRoomPhotos = (roomId: string, urls: string[]) => {
    setRoomImages((prev) => ({
      ...prev,
      [roomId]: urls,
    }));
  };

  const removeRoomPhoto = (roomId: string, index: number) => {
    setRoomImages((prev) => {
      const current = prev[roomId] || [];
      const updated = current.filter((_, idx) => idx !== index);
      return {
        ...prev,
        [roomId]: updated,
      };
    });
  };

  const generatePermanentDataCode = (): string => {
    const updatedRooms = ROOMS.map((r) => ({
      ...r,
      images: roomImages[r.id] && roomImages[r.id].length > 0 ? roomImages[r.id] : r.images,
    }));

    return `// Updated hotelData.ts with permanently embedded photos
import { RoomItem, GalleryPhoto, MenuItem, AmenityItem } from '../types';

export const HOTEL_INFO = ${JSON.stringify(HOTEL_INFO, null, 2)};
export const ROOMS: RoomItem[] = ${JSON.stringify(updatedRooms, null, 2)};
export const GALLERY_PHOTOS: GalleryPhoto[] = ${JSON.stringify(galleryPhotos, null, 2)};
export const ALTITUDE_AMENITIES: AmenityItem[] = ${JSON.stringify(ALTITUDE_AMENITIES, null, 2)};
export const MENU_ITEMS: MenuItem[] = ${JSON.stringify(MENU_ITEMS, null, 2)};
export const TRAVEL_TIPS = ${JSON.stringify(TRAVEL_TIPS, null, 2)};
`;
  };

  const resetAllPhotosToDefault = () => {
    setGalleryPhotos(GALLERY_PHOTOS);
    setHeroImageState(DEFAULT_HERO_IMAGE);
    setLogoImageState(DEFAULT_LOGO_IMAGE);
    setRoomImages(initialRoomImages);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('kyelang_homestay_custom_photos_v5');
    } catch {
      // ignore
    }
  };

  return (
    <PhotoContext.Provider
      value={{
        galleryPhotos,
        heroImage,
        logoImage,
        roomImages,
        isManagerOpen,
        openManager,
        closeManager,
        managerTargetDestination,
        managerActiveTab,
        addGalleryPhoto,
        addMultipleGalleryPhotos,
        deleteGalleryPhoto,
        setHeroImage,
        setLogoImage,
        addRoomPhoto,
        addMultipleRoomPhotos,
        removeRoomPhoto,
        setRoomCoverPhoto,
        reorderRoomPhotos,
        setRoomPhotos,
        resetAllPhotosToDefault,
        generatePermanentDataCode,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
};
