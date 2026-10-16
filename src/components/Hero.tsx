import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onStoryClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#FBFBFA] pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Unboxed Metadata Kicker (Anti-pill) */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#737067]">
              <span>Small Batch Provenance</span>
              <span aria-hidden="true" className="text-[#A3A096]">·</span>
              <span>2026 Studio Release</span>
              <span aria-hidden="true" className="text-[#A3A096]">·</span>
              <span>Denmark & Sweden</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-medium tracking-tight text-[#191919] leading-[1.12] [text-wrap:balance]">
              Objects for the unhurried life.
            </h1>

            {/* Subtitle measure 65ch */}
            <p className="text-base sm:text-lg text-[#5A5852] leading-relaxed max-w-xl font-normal">
              A curated catalog of architectural ceramics, hand-spun ambient lighting, and tactile solid oak furniture. Thoughtfully conceived to elevate everyday rituals.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#191919] text-[#FAF8F5] text-sm font-medium rounded-lg hover:bg-[#33312D] transition-colors shadow-xs cursor-pointer group whitespace-nowrap shrink-0"
              >
                <span>Explore Archival Objects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onStoryClick}
                className="inline-flex items-center px-5 py-3.5 text-sm font-medium text-[#4A4843] hover:text-[#191919] bg-[#F2EFE9] hover:bg-[#EAE6DE] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Read Manifesto
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Slot */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#EBE8E0] shadow-sm group">
              <img
                src={HERO_IMAGE}
                alt="Architectural Scandinavian interior with solid oak table, ceramic vase, and warm ambient brass pendant lamp"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between font-mono-numbers opacity-90 drop-shadow-sm">
                <span>Nordic Studio Space · Aarhus Workshop</span>
                <span>Natural Oak & Sand Glaze</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Provenance Strip (Full-width row below hero split) */}
        <div className="mt-12 pt-8 border-t border-[#E8E6DF] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#4A4843] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-[#191919]">10-Year Repair Warranty</h4>
              <p className="text-xs text-[#737067] mt-0.5">Heritage joinery built to endure generations.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#4A4843] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-[#191919]">Carbon-Neutral Courier</h4>
              <p className="text-xs text-[#737067] mt-0.5">Plastic-free molded wool packaging.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#4A4843] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-[#191919]">Certified Materials</h4>
              <p className="text-xs text-[#737067] mt-0.5">FSC timber and OEKO-TEX natural flax.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-[#4A4843] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-[#191919]">30-Day Architectural Trial</h4>
              <p className="text-xs text-[#737067] mt-0.5">Experience the light and form in your space.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
