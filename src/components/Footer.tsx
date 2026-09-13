import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenWhatsApp?: (prompt?: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Heritage', href: '#about' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Comforts', href: '#comforts' },
    { name: 'Glacier Terrace', href: '#terrace' },
    { name: 'Dining', href: '#dining' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <footer id="contact" className="bg-[#1f0508] text-stone-300 py-16 sm:py-20 border-t border-[#500000]/30 scroll-mt-6">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Identity */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow-md flex items-center justify-center overflow-hidden border border-stone-300">
                <img
                  src={HOTEL_INFO.logo}
                  alt="Kyelang Times Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-widest uppercase">
                  KYELANG TIMES
                </h3>
                <p className="text-[10px] text-stone-400 tracking-[0.25em] uppercase">
                  The Dragon Heritage Home · Keylong
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-md">
              A boutique high-altitude homestay in historic Keylong Village. Offering heated electric mattresses, 24/7 hot showers, traditional dragon painted rooms, and rooftop glacier panoramas.
            </p>

            <span className="inline-block text-[11px] text-stone-400 border border-stone-800 px-3 py-1 rounded-full uppercase tracking-wider">
              Heart of Keylong Village, Lahaul & Spiti (H.P.)
            </span>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-stone-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Direct Inquiries
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-white transition-colors">
                  {HOTEL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white transition-colors">
                  {HOTEL_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-stone-400 leading-snug">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>Keylong Village, near Old Monastery Trail, Lahaul - 175132</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Kyelang Times : The Dragon Heritage Home · Keylong.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer text-xs"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
