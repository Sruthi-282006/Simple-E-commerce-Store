import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#DDD9CE] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E6DF] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C25E3E] fill-current" />
            <h2 className="text-base font-semibold text-[#191919]">Saved Objects</h2>
            <span className="text-xs text-[#737067] font-mono-numbers">
              ({wishlist.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#737067] hover:text-[#191919] hover:bg-[#F2EFE9] rounded-lg transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#EAE6DC] flex items-center justify-center text-[#737067]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-lg font-medium text-[#191919]">No saved objects yet</h3>
              <p className="text-xs text-[#737067] max-w-xs">
                Click the heart icon on any piece to save it to your personal curation.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#191919] text-[#FAF8F5] text-xs font-semibold rounded-lg hover:bg-[#33312D] transition-colors cursor-pointer"
              >
                Browse Objects
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 bg-white p-3 rounded-xl border border-[#E8E6DF] shadow-xs"
              >
                <div className="w-20 h-20 bg-[#F4F2EB] rounded-lg overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-semibold text-[#191919] line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="text-[#9E9B93] hover:text-[#C25E3E] transition-colors p-0.5 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-[#737067]">{product.category}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-[#191919] font-mono-numbers tabular-nums">
                      ${product.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => onMoveToCart(product)}
                      className="px-3 py-1 bg-[#191919] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#33312D] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
