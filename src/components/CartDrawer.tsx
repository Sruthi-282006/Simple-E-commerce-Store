import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { PROMO_CODES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discountPercent: number;
  setDiscountPercent: (percent: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  promoCode,
  setPromoCode,
  discountPercent,
  setDiscountPercent,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 200;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shipping = items.length === 0 ? 0 : isFreeShipping ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const progressToFreeShip = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountToFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (!clean) return;

    if (PROMO_CODES[clean]) {
      setPromoCode(clean);
      setDiscountPercent(PROMO_CODES[clean].discountPercent);
      setCouponSuccess(`Applied: ${PROMO_CODES[clean].description}`);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Invalid promo code. Try WELCOME10 or NORD15');
      setCouponSuccess('');
    }
  };

  const handleRemoveCoupon = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setCouponSuccess('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#DDD9CE] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8E6DF] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#191919]" />
            <h2 className="text-base font-semibold text-[#191919]">Shopping Bag</h2>
            <span className="text-xs text-[#737067] font-mono-numbers">
              ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#737067] hover:text-[#191919] hover:bg-[#F2EFE9] rounded-lg transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#F2EFE9] border-b border-[#E8E6DF]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-[#4A4843]">
            {isFreeShipping && items.length > 0 ? (
              <span className="flex items-center gap-1.5 text-[#2E5E4E] font-semibold">
                <Check className="w-3.5 h-3.5" />
                Unlocked complimentary courier delivery
              </span>
            ) : (
              <span>
                Add <strong className="text-[#191919] font-mono-numbers">${amountToFreeShip.toFixed(2)}</strong> more for free courier
              </span>
            )}
            <span className="font-mono-numbers text-[11px] text-[#737067]">
              ${subtotal.toFixed(0)} / ${FREE_SHIPPING_THRESHOLD}
            </span>
          </div>
          <div className="w-full bg-[#DDD9CE] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#191919] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeShip}%` }}
            />
          </div>
        </div>

        {/* Item List / Empty State */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#EAE6DC] flex items-center justify-center text-[#737067]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-lg font-medium text-[#191919]">Your bag is empty</h3>
              <p className="text-xs text-[#737067] max-w-xs">
                Explore our collection of handcrafted architectural ceramics, lamps, and studio furniture.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#191919] text-[#FAF8F5] text-xs font-semibold rounded-lg hover:bg-[#33312D] transition-colors cursor-pointer"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-white p-3 rounded-xl border border-[#E8E6DF] shadow-xs"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#F4F2EB] rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details & Controls */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-semibold text-[#191919] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#9E9B93] hover:text-[#C25E3E] transition-colors p-0.5 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedVariant && (
                      <p className="text-[11px] text-[#737067] mt-0.5">
                        Finish: {item.selectedVariant}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#DDD9CE] rounded-md bg-[#FAF8F5]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-[#4A4843] hover:text-[#191919] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-1.5 font-mono-numbers text-xs font-semibold text-[#191919] min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        disabled={item.quantity >= item.product.stockCount}
                        className="px-2 py-0.5 text-xs text-[#4A4843] hover:text-[#191919] disabled:opacity-40 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-xs font-bold text-[#191919] font-mono-numbers tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8E6DF] bg-white space-y-4">
            {/* Promo Code Input */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between bg-[#F2EFE9] px-3 py-2 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-[#191919] font-medium font-mono-numbers">
                    <Tag className="w-3.5 h-3.5 text-[#2E5E4E]" />
                    <span>{promoCode} (-{discountPercent}%)</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs text-[#737067] hover:text-[#C25E3E] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. WELCOME10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD9CE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#191919] font-mono-numbers uppercase text-[#191919]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#F2EFE9] text-[#191919] text-xs font-medium rounded-lg hover:bg-[#EAE6DE] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && <p className="text-[11px] text-[#C25E3E] mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-[#2E5E4E] mt-1">{couponSuccess}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5A5852] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono-numbers tabular-nums text-[#191919]">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2E5E4E]">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="font-mono-numbers tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Courier</span>
                <span className="font-mono-numbers tabular-nums text-[#191919]">
                  {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#191919] pt-2 border-t border-[#F0EEE6]">
                <span>Total Due</span>
                <span className="font-mono-numbers tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-3.5 bg-[#191919] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#33312D] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
