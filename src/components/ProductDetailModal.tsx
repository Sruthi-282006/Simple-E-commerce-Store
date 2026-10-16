import React, { useState } from 'react';
import { X, Star, Heart, Check, Shield, Truck, RotateCcw, Package } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const defaultVariant = product.variants?.[0]?.options?.[0] || '';
  const [selectedVariant, setSelectedVariant] = useState<string>(defaultVariant);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care'>('details');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#DDD9CE] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#737067] hover:text-[#191919] hover:bg-[#F2EFE9] rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Product Visual Display */}
          <div className="relative bg-[#F4F2EB] p-6 flex flex-col justify-between">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-white shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Material Origin Badge */}
            <div className="mt-4 pt-3 border-t border-[#E5E2D8] flex items-center justify-between text-xs text-[#737067] font-mono-numbers">
              <span>Origin: {product.origin}</span>
              <span className="text-[#2E5E4E] font-semibold">● In Stock ({product.stockCount} units)</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#737067] mb-2">
                <span className="uppercase tracking-wider font-semibold">{product.category}</span>
                <div className="flex items-center gap-1 font-mono-numbers">
                  <Star className="w-3.5 h-3.5 fill-[#E6A147] text-[#E6A147]" />
                  <span className="font-semibold text-[#191919]">{product.rating}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl font-serif-display font-semibold text-[#191919] leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-[#737067] mt-1 mb-4">
                {product.tagline}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-bold text-[#191919] font-mono-numbers tabular-nums">
                  ${(product.price * quantity).toFixed(2)}
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-[#737067] font-mono-numbers">
                    (${product.price.toFixed(2)} each)
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-sm text-[#9E9B93] line-through font-mono-numbers tabular-nums">
                    ${(product.originalPrice * quantity).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6 space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4843] block">
                    {product.variants[0].name}: <span className="font-normal text-[#191919]">{selectedVariant}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants[0].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedVariant(option)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                          selectedVariant === option
                            ? 'border-[#191919] bg-[#191919] text-white shadow-xs'
                            : 'border-[#DDD9CE] bg-white text-[#4A4843] hover:border-[#191919]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Primary Add Button */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-[#DDD9CE] rounded-lg bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-sm text-[#4A4843] hover:text-[#191919] disabled:opacity-40 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2 font-mono-numbers text-sm font-semibold text-[#191919] min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                    className="px-3 py-2 text-sm text-[#4A4843] hover:text-[#191919] disabled:opacity-40 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    added
                      ? 'bg-[#2E5E4E] text-white'
                      : 'bg-[#191919] text-[#FAF8F5] hover:bg-[#33312D]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4" />
                      <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-[#C25E3E] bg-[#C25E3E]/10 text-[#C25E3E]'
                      : 'border-[#DDD9CE] hover:border-[#191919] text-[#4A4843]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Informational Specs Tabs */}
              <div className="border-t border-[#E8E6DF] pt-4">
                <div className="flex gap-4 border-b border-[#F0EEE6] pb-2 mb-3 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'details'
                        ? 'border-b-2 border-[#191919] text-[#191919] font-semibold'
                        : 'text-[#737067] hover:text-[#191919]'
                    }`}
                  >
                    Artisanal Notes
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'specs'
                        ? 'border-b-2 border-[#191919] text-[#191919] font-semibold'
                        : 'text-[#737067] hover:text-[#191919]'
                    }`}
                  >
                    Dimensions & Sourcing
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'care'
                        ? 'border-b-2 border-[#191919] text-[#191919] font-semibold'
                        : 'text-[#737067] hover:text-[#191919]'
                    }`}
                  >
                    Care Guide
                  </button>
                </div>

                <div className="text-xs text-[#5A5852] leading-relaxed">
                  {activeTab === 'details' && (
                    <div className="space-y-2">
                      <p>{product.description}</p>
                      <ul className="list-disc list-inside space-y-1 text-[#4A4843] pt-1">
                        {product.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b border-[#F4F2EB]">
                        <span className="text-[#8C8980]">Dimensions</span>
                        <span className="font-mono-numbers text-[#191919]">{product.dimensions}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#F4F2EB]">
                        <span className="text-[#8C8980]">Materials</span>
                        <span className="text-[#191919] text-right">{product.materials}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#F4F2EB]">
                        <span className="text-[#8C8980]">Provenance</span>
                        <span className="text-[#191919]">{product.origin}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div className="space-y-2">
                      <p>
                        Wipe with a soft damp cloth. Avoid harsh chemical cleaners or abrasive scouring pads. For timber and unglazed ceramics, natural oils can be applied annually to maintain the natural matte finish.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quiet Trust Footnote */}
            <div className="mt-6 pt-4 border-t border-[#F0EEE6] grid grid-cols-3 gap-2 text-[11px] text-[#737067]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#191919]" />
                <span>Green courier</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#191919]" />
                <span>10-yr warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#191919]" />
                <span>30-day trial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
