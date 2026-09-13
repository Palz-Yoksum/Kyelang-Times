import React, { useState } from 'react';
import { PhotoProvider } from './context/PhotoContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutHomestay } from './components/AboutHomestay';
import { RoomsSection } from './components/RoomsSection';
import { AltitudeComforts } from './components/AltitudeComforts';
import { TerraceAndGlaciers } from './components/TerraceAndGlaciers';
import { DiningSection } from './components/DiningSection';
import { GallerySection } from './components/GallerySection';
import { LocationGuide } from './components/LocationGuide';
import { WhatsAppChatbot } from './components/WhatsAppChatbot';
import { Footer } from './components/Footer';
import { PhotoManagerModal } from './components/PhotoManagerModal';

export default function App() {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppPrompt, setWhatsAppPrompt] = useState<string | undefined>(undefined);
  const [selectedRoomHighlight, setSelectedRoomHighlight] = useState<string | null>(null);

  const handleOpenWhatsApp = (prompt?: string) => {
    if (prompt) {
      setWhatsAppPrompt(prompt);
    }
    setIsWhatsAppOpen(true);
  };

  const handleQuickBookSelect = (roomCategory: string) => {
    setSelectedRoomHighlight(roomCategory);
    const roomsElement = document.getElementById('rooms');
    if (roomsElement) {
      roomsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PhotoProvider>
      <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-[#500000] selection:text-white flex flex-col">
        {/* Navigation Header */}
        <Navbar onOpenWhatsApp={handleOpenWhatsApp} />

        {/* Main Single-Page Flow */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onOpenWhatsApp={handleOpenWhatsApp}
            onQuickBookSelect={handleQuickBookSelect}
          />

          {/* Heritage & Buddhism / Dragon Concept */}
          <AboutHomestay />

          {/* Rooms & Dormitory Showcase */}
          <RoomsSection
            onOpenWhatsApp={handleOpenWhatsApp}
            selectedRoomHighlight={selectedRoomHighlight}
          />

          {/* 3000m Altitude Comforts: Heated Mattresses & 24/7 Hot Showers */}
          <AltitudeComforts />

          {/* Top-Floor Glaciers of Keylong & Rooftop Chill Terrace */}
          <TerraceAndGlaciers onOpenWhatsApp={handleOpenWhatsApp} />

          {/* Traditional Tibetan & Indian Restaurant */}
          <DiningSection onOpenWhatsApp={handleOpenWhatsApp} />

          {/* Expanded Photo Gallery Showcase */}
          <GallerySection />

          {/* Location in Heart of Keylong Village (3000m) & Route Guide */}
          <LocationGuide onOpenWhatsApp={handleOpenWhatsApp} />
        </main>

        {/* Footer */}
        <Footer onOpenWhatsApp={handleOpenWhatsApp} />

        {/* Floating WhatsApp Chatbot Plugin */}
        <WhatsAppChatbot
          isOpen={isWhatsAppOpen}
          onToggle={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
          initialPrompt={whatsAppPrompt}
        />

        {/* In-App Photo Manager Modal */}
        <PhotoManagerModal />
      </div>
    </PhotoProvider>
  );
}

