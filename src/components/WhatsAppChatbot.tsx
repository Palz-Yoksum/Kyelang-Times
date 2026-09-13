import React, { useState, useEffect, useRef } from 'react';
import { TibetanDragonIcon } from './TibetanIcons';
import { HOTEL_INFO } from '../data/hotelData';
import { MessageSquare, X, Send } from 'lucide-react';

interface WhatsAppChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  initialPrompt?: string;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const WhatsAppChatbot: React.FC<WhatsAppChatbotProps> = ({
  isOpen,
  onToggle,
  initialPrompt
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Tashi Delek! Welcome to Kyelang Times : The Dragon Heritage Homestay in Keylong Village (3,000m).',
      timestamp: 'Just now'
    },
    {
      id: 'welcome-2',
      sender: 'bot',
      text: 'We offer cozy Dragon Private Rooms with heated mattresses and attached baths, plus an 8-bed Hostel Dorm with individual electric blankets and 2 shared washrooms with hot showers. How can we help you plan your Himalayan stay?',
      timestamp: 'Just now'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('Dragon Private room 1');
  const [guestCount, setGuestCount] = useState(2);
  const [checkInDate, setCheckInDate] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [guestName, setGuestName] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-fill prompt if triggered externally
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendUserQuery(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, showBookingForm]);

  const quickPrompts = [
    { label: 'Private Rooms & Dorm', prompt: 'I would like to check availability and rates for the Dragon Private Rooms and 8-bed Hostel Dorm.' },
    { label: 'Electric Blankets & Showers', prompt: 'Could you confirm electric blankets/heated mattresses and 24/7 hot shower availability?' },
    { label: 'Homestay Kitchen Meals', prompt: 'What traditional Tibetan and Indian meals are served in your homestay kitchen?' },
    { label: 'Atal Tunnel & Road Status', prompt: 'Could you provide directions and current road conditions from Manali to Keylong?' }
  ];

  const handleSendUserQuery = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const newMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      let reply = "We'd be delighted to assist you! Our host family in Keylong Village is ready to confirm dates, room allocation, and road guidance.";
      
      const lower = textToSend.toLowerCase();
      if (lower.includes('dorm') || lower.includes('hostel') || lower.includes('bed')) {
        reply = "Our Hostel Dorm Room features 8 single beds, each fitted with its own individual electric blanket for freezing nights, plus 2 dedicated shared washrooms with 24/7 hot shower facility at ₹650/bed. Cleanliness is our top priority.";
      } else if (lower.includes('dragon') || lower.includes('room') || lower.includes('private')) {
        reply = "We offer two private rooms: Dragon Private room 1 and Dragon private room 2, located on the top floor with direct panoramic views of the Keylong glaciers, heated mattresses, dragon painted boutique artwork, and 24/7 hot showers.";
      } else if (lower.includes('heated') || lower.includes('shower') || lower.includes('hot') || lower.includes('blanket')) {
        reply = "At 3,000m altitude, warmth is essential. Dragon Private Rooms feature dual-zone heated mattresses, while all 8 beds in the hostel dorm have individual electric blankets. 24/7 instant hot water geysers are provided in private attached baths and the 2 shared dorm washrooms.";
      } else if (lower.includes('food') || lower.includes('momos') || lower.includes('kitchen') || lower.includes('dining')) {
        reply = "Our in-house homestay kitchen serves freshly prepared Tibetan Momos, Thukpa soup, traditional Lahauli Siddu with pure ghee, authentic butter tea, and comforting homestyle Indian meals.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 500);
  };

  const handleLaunchWhatsApp = (customText?: string) => {
    const message = customText || inputText || "Hello Kyelang Times, I would like to inquire about staying at the Dragon Heritage Homestay in Keylong.";
    const url = `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDispatchBookingForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hello Kyelang Times!
I would like to make a reservation:
• Name: ${guestName || 'Traveler'}
• Accommodation: ${selectedRoom}
• Guests / Beds: ${guestCount}
• Check-in Date: ${checkInDate || 'Flexible'}
• Location: Kyelang Times Dragon Homestay, Keylong Village (3000m)

Please let me know availability and payment details. Thank you!`;
    
    handleLaunchWhatsApp(formatted);
  };

  return (
    <>
      {/* Floating Action Button */}
      <aside aria-label="WhatsApp Homestay Host Chat" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={onToggle}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#500000] shadow-xl border border-[#500000]/30 text-xs font-semibold hover:border-[#500000] transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#500000]" />
            <span>Chat with Homestay Host</span>
          </button>
        )}

        <button
          onClick={onToggle}
          aria-label="Open Homestay Host Chat"
          className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'bg-stone-900 rotate-90 scale-95'
              : 'bg-[#500000] hover:bg-[#3B0000] hover:scale-105'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageSquare className="w-7 h-7 fill-white" />
          )}
        </button>
      </aside>

      {/* Clean Minimalist Chatbot Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="WhatsApp Homestay Host Chat"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[540px] bg-white rounded-2xl shadow-2xl border border-[#500000]/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[#500000] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#5c0000] flex items-center justify-center text-white shrink-0">
                <TibetanDragonIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-white">
                  Kyelang Times Host Chat
                </h4>
                <p className="text-[11px] text-white/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>Keylong Village · 3,000m</span>
                </p>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="p-1 rounded-md hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-white border-b border-[#500000]/20 text-xs font-semibold">
            <button
              onClick={() => setShowBookingForm(false)}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
                !showBookingForm
                  ? 'border-b-2 border-[#500000] text-[#500000] bg-white'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Direct Chat
            </button>
            <button
              onClick={() => setShowBookingForm(true)}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
                showBookingForm
                  ? 'border-b-2 border-[#500000] text-[#500000] bg-white'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Check Dates
            </button>
          </div>

          {/* Body Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white text-xs max-h-[320px]">
            {!showBookingForm ? (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed shadow-2xs ${
                        msg.sender === 'user'
                          ? 'bg-[#500000] text-white rounded-br-xs'
                          : 'bg-white text-stone-800 rounded-bl-xs border border-[#500000]/20'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`text-[9px] block text-right mt-1 ${msg.sender === 'user' ? 'text-white/80' : 'text-stone-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Quick Prompts */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block mb-1.5">
                    Quick Inquiries:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickPrompts.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendUserQuery(chip.prompt)}
                        className="text-[11px] bg-white hover:bg-[#500000] hover:text-white text-stone-700 px-2.5 py-1 rounded-full border border-[#500000]/20 transition-colors text-left cursor-pointer"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div ref={chatBottomRef} />
              </>
            ) : (
              /* Quick Reservation Form */
              <form onSubmit={handleDispatchBookingForm} className="space-y-3 bg-white p-3.5 rounded-xl border border-[#500000]/20 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma / Tenzin"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#500000]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Accommodation</label>
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#500000] bg-white"
                  >
                    <option value="Dragon Private room 1 (₹3,850/night)">
                      Dragon Private room 1 (₹3,850/night)
                    </option>
                    <option value="Dragon private room 2 (₹3,450/night)">
                      Dragon private room 2 (₹3,450/night)
                    </option>
                    <option value="Hostel Dorm Room - 8 Single Beds (₹650/bed/night)">
                      Hostel Dorm Room - 8 Single Beds (₹650/bed/night)
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Check-in Date</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#500000]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Guests / Beds</label>
                    <input
                      type="number"
                      min={1}
                      max={8}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#500000]"
                    />
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-white border border-[#500000]/20 text-stone-700 text-[11px]">
                  Heated electric mattress / electric blanket and 24/7 hot water showers included.
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#500000] hover:bg-[#3B0000] text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Confirm on WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Input Strip */}
          <div className="p-3 bg-white border-t border-[#500000]/20 space-y-2">
            {!showBookingForm && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendUserQuery(inputText);
                    }
                  }}
                  className="flex-1 px-3 py-1.5 text-xs rounded-full border border-stone-300 focus:outline-hidden focus:border-[#500000]"
                />
                <button
                  onClick={() => handleSendUserQuery(inputText)}
                  disabled={!inputText.trim()}
                  className="w-8 h-8 rounded-full bg-[#500000] text-white flex items-center justify-center shrink-0 disabled:opacity-30 cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={() => handleLaunchWhatsApp(inputText || undefined)}
              className="w-full py-2 rounded-xl bg-[#500000] hover:bg-[#3B0000] text-white font-medium text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Launch WhatsApp Direct Chat</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
