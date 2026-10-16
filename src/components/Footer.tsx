import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onScrollToStory: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onScrollToStory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#191919] text-[#FAF8F5] pt-16 pb-12 border-t border-[#33312D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#33312D]">
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xl font-bold font-serif-display tracking-tight text-white">
              ATELIER NORD
            </h3>
            <p className="text-xs text-[#A8A59D] leading-relaxed max-w-sm">
              Architectural ceramics, ambient lighting fixtures, and solid oak furniture produced in small batches with independent workshops across Scandinavia and Japan.
            </p>

            <div className="pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#D1CEC7] block mb-2">
                Studio Gazette & Limited Releases
              </label>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#6EE7B7] bg-[#2E5E4E]/40 px-3 py-2 rounded-lg border border-[#2E5E4E]">
                  <Check className="w-4 h-4" />
                  <span>You are subscribed to the Atelier Gazette.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-[#292724] border border-[#44423E] rounded-lg text-white placeholder-[#78756E] focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FAF8F5] text-[#191919] text-xs font-semibold rounded-lg hover:bg-white transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links Column: Curations */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A59D]">
              <li>
                <button
                  onClick={() => onSelectCategory('Lighting')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Architectural Lighting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Ceramics & Glass')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wheel-Thrown Ceramics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Furniture')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Solid White Oak Furniture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Textiles')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  European Flax Textiles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Kitchen & Table')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cast Metallurgy & Tableware
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Studio Objects')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Brass & Slate Studio Objects
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column: Atelier & Support */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              Atelier
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A59D]">
              <li>
                <button onClick={onScrollToStory} className="hover:text-white transition-colors cursor-pointer">
                  Craft Manifesto
                </button>
              </li>
              <li>
                <span className="text-[#A8A59D]">Aarhus Workshop</span>
              </li>
              <li>
                <span className="text-[#A8A59D]">Material Provenance</span>
              </li>
              <li>
                <span className="text-[#A8A59D]">Trade & Architects</span>
              </li>
            </ul>
          </div>

          {/* Links Column: Services */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A59D]">
              <li>
                <span className="text-[#A8A59D]">Carbon-Neutral Courier</span>
              </li>
              <li>
                <span className="text-[#A8A59D]">10-Year Repair Policy</span>
              </li>
              <li>
                <span className="text-[#A8A59D]">30-Day Home Trial</span>
              </li>
              <li>
                <span className="text-[#A8A59D]">studio@ateliernord.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78756E]">
          <div>
            © {new Date().getFullYear()} Atelier Nord Ltd. All designs copyrighted.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Studio</span>
            <span>Accessibility (WCAG AA)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
