import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface NavbarProps {
  onOpenWhatsApp?: (prompt?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Rooms', href: '#rooms' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Maroon & White Navigation Bar */}
      <nav
        className={`w-full relative transition-all duration-300 ${
          isScrolled
            ? 'bg-[#500000]/95 backdrop-blur-md shadow-lg py-3 border-b border-amber-500/20'
            : 'bg-[#500000] py-3.5 sm:py-4.5 border-b border-amber-500/20'
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between min-h-[58px] sm:min-h-[64px]">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-4 sm:gap-6 z-10">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, '#home')}
              className="block cursor-pointer text-left group"
            >
              <span className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-widest text-white uppercase block leading-tight group-hover:text-amber-200 transition-colors">
                KYELANG TIMES
              </span>
              <span className="text-[9px] sm:text-[10.5px] text-stone-200 font-medium tracking-[0.2em] uppercase block font-sans">
                The Dragon Heritage Home
              </span>
            </a>
          </div>

          {/* Center: Overlapping 4cm Diameter Logo Crest */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2 z-50 flex flex-col items-center pointer-events-auto"
            style={{ width: '4cm', height: '4cm' }}
          >
            <div className="relative">
              {/* Circular Logo Image - 4cm Diameter using Kyelang Times Logo (2).jpg */}
              <div
                className="w-[4cm] h-[4cm] min-w-[4cm] min-h-[4cm] rounded-full bg-white overflow-hidden flex items-center justify-center shadow-2xl border-4 border-amber-100 ring-2 ring-[#500000]/40 relative transition-transform duration-300 hover:scale-105"
                style={{ width: '4cm', height: '4cm' }}
              >
                <img
                  src={HOTEL_INFO.logo}
                  alt="Kyelang Times Logo"
                  className="w-full h-full object-cover rounded-full"
                  style={{ width: '4cm', height: '4cm' }}
                />
              </div>
            </div>
          </div>

          {/* Right: Rooms & Contact Us Hyperlinks */}
          <div className="flex items-center gap-4 sm:gap-6 z-10">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 sm:gap-8 text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-white hover:text-amber-200 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#500000] border-t border-white/10 px-6 py-4 space-y-2 shadow-lg text-white">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="block text-white hover:text-amber-200 text-sm uppercase tracking-wider font-semibold py-2 border-b border-white/10"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
