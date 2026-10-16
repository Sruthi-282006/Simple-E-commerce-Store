import React, { useState } from 'react';
import { Heart, Star, Plus, Eye, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group flex flex-col bg-white rounded-xl border border-[#E8E6DF] overflow-hidden hover:border-[#D5D1C5] hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      {/* Visual Slot (65-75% visual dominance with 4:3 ratio) */}
      <div className="relative aspect-[4/3] w-full bg-[#F4F2EB] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F5F2EB] to-[#E9E5DC] text-[#737067]">
            <span className="text-sm font-medium font-serif-display text-center">{product.name}</span>
            <span className="text-xs text-[#99968D] mt-1">{product.category}</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-[#191919] text-white shadow-sm'
              : 'bg-white/85 text-[#4A4843] hover:text-[#191919] hover:bg-white shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-[#E06D53]' : ''}`} />
        </button>

        {/* Stock / Limited Tag (Unboxed clean text) */}
        {product.stockCount <= 8 && (
          <div className="absolute top-3 left-3 bg-[#191919]/90 text-white text-[11px] font-medium px-2 py-0.5 rounded tracking-wide font-mono-numbers backdrop-blur-xs">
            Only {product.stockCount} in studio
          </div>
        )}

        {/* Quick View Floating Action on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-[#191919] text-xs font-semibold rounded-md shadow-sm backdrop-blur-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed Metadata Header */}
          <div className="flex items-center justify-between text-xs text-[#737067]">
            <span className="tracking-wide uppercase font-medium">{product.category}</span>
            <div className="flex items-center gap-1 font-mono-numbers">
              <Star className="w-3 h-3 fill-[#E6A147] text-[#E6A147]" />
              <span className="font-semibold text-[#2C2A26]">{product.rating}</span>
              <span className="text-[#99968D]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-display text-base font-semibold text-[#191919] mt-1 group-hover:text-[#4A4843] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline / Material origin */}
          <p className="text-xs text-[#737067] line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Price & Primary Add Action */}
        <div className="pt-2 border-t border-[#F0EEE6] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#191919] font-mono-numbers tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E9B93] line-through font-mono-numbers tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              justAdded
                ? 'bg-[#2E5E4E] text-white'
                : 'bg-[#F2EFE9] text-[#191919] hover:bg-[#191919] hover:text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
