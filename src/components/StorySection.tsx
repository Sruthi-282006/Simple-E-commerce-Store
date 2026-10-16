import React from 'react';
import { REVIEWS } from '../data/products';
import { Award, Compass, HeartHandshake, Leaf } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="studio-ethos" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Ethos Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#737067] mb-2">
            <span>Philosophy & Production</span>
            <span aria-hidden="true" className="text-[#A3A096]">·</span>
            <span>Artisanal Accountability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#191919] leading-tight [text-wrap:balance]">
            Slow manufacturing for living spaces that breathe.
          </h2>
          <p className="text-base text-[#5A5852] mt-4 leading-relaxed font-normal">
            Atelier Nord was founded on the conviction that everyday objects should outlive trends. We collaborate directly with independent heritage workshops in Denmark, Sweden, Lithuania, and Japan—yielding objects characterized by honest materiality, tactile restraint, and repairability.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Leaf className="w-5 h-5 text-[#2E5E4E]" />
            <h3 className="text-base font-semibold text-[#191919]">01. 100% Traceable Provenance</h3>
            <p className="text-xs text-[#5A5852] leading-relaxed">
              Every timber piece is crafted from FSC-certified European white oak, while our linen is woven strictly from OEKO-TEX certified Baltic flax.
            </p>
          </div>

          <div className="space-y-3">
            <Award className="w-5 h-5 text-[#2E5E4E]" />
            <h3 className="text-base font-semibold text-[#191919]">02. Wedged Tenon Joinery</h3>
            <p className="text-xs text-[#5A5852] leading-relaxed">
              We forego plastic hardware and cheap veneer. Our solid oak furniture utilizes precision friction joinery that expands naturally with humidity.
            </p>
          </div>

          <div className="space-y-3">
            <Compass className="w-5 h-5 text-[#2E5E4E]" />
            <h3 className="text-base font-semibold text-[#191919]">03. Circular Studio Care</h3>
            <p className="text-xs text-[#5A5852] leading-relaxed">
              We maintain replacement parts, brass cables, and organic wax finishes for every collection released since our inception in 2021.
            </p>
          </div>

          <div className="space-y-3">
            <HeartHandshake className="w-5 h-5 text-[#2E5E4E]" />
            <h3 className="text-base font-semibold text-[#191919]">04. Plastic-Free Fulfillment</h3>
            <p className="text-xs text-[#5A5852] leading-relaxed">
              All packaging uses unbleached recycled cardboard, molded compostable sheep wool insulation, and water-activated paper tape.
            </p>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency: Attributable Customer Testimonials */}
        <div className="pt-8 border-t border-[#E8E6DF]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-serif-display font-semibold text-[#191919]">
                Collector Voices & Verified Spaces
              </h3>
              <p className="text-xs text-[#737067] mt-0.5">
                Reflections from architects, interior designers, and collectors worldwide.
              </p>
            </div>
            <span className="text-xs font-mono-numbers text-[#737067]">
              4.92 / 5.0 Average Studio Score
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-xl border border-[#E8E6DF] flex flex-col justify-between shadow-xs space-y-4"
              >
                <p className="text-xs text-[#3A3834] leading-relaxed italic">
                  "{review.text}"
                </p>

                <div className="pt-3 border-t border-[#F0EEE6] flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-[#191919]">{review.author}</h4>
                    <span className="text-[11px] text-[#737067]">{review.location}</span>
                  </div>
                  <span className="text-[10px] text-[#8C8980] font-mono-numbers">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
