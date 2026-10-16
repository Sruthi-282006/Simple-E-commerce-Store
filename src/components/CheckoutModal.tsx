import React, { useState } from 'react';
import { X, Check, Lock, CreditCard, Truck, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { CartItem, OrderReceipt, ShippingAddress } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  onOrderComplete: (receipt: OrderReceipt) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  discountCode,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: 'Astrid Lind',
    email: 'astrid.lind@nordicdesign.com',
    phone: '+45 28 91 04 22',
    address: 'Bredgade 42, 2. th',
    city: 'Copenhagen',
    state: 'Capital Region',
    postalCode: '1260',
    country: 'Denmark',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'cod'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvc: '884',
    name: 'Astrid Lind',
  });

  if (!isOpen) return null;

  const baseShipping = subtotal >= 200 ? 0 : 15;
  const shippingCost = shippingMethod === 'express' ? baseShipping + 25 : baseShipping;
  const grandTotal = Math.max(0, subtotal - discount + shippingCost);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.email || !shippingAddress.address || !shippingAddress.city) {
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const randomOrderNumber = Math.floor(10000 + Math.random() * 90000);
      const receipt: OrderReceipt = {
        orderId: `AN-2026-${randomOrderNumber}`,
        orderDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        items: [...items],
        subtotal,
        discount,
        shipping: shippingCost,
        total: grandTotal,
        discountCode,
        shippingAddress: { ...shippingAddress },
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card (Ending in 4242)'
            : paymentMethod === 'wallet'
            ? 'Digital Express Wallet'
            : 'Cash on Delivery (Courier Verification)',
        deliveryEstimate: shippingMethod === 'express' ? '1–2 Business Days' : '3–5 Business Days',
      };
      setIsSubmitting(false);
      onOrderComplete(receipt);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#DDD9CE] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E6DF] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <span className="font-serif-display text-lg font-bold text-[#191919]">Studio Checkout</span>
            <span className="text-xs text-[#737067] font-mono-numbers">
              Step {step} of 3
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#737067] hover:text-[#191919] hover:bg-[#F2EFE9] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#E8E6DF] h-1">
          <div
            className="bg-[#191919] h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* STEP 1: Customer & Shipping Details */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-[#191919]">1. Delivery & Contact Details</h3>
                <span className="text-xs text-[#737067] flex items-center gap-1 font-mono-numbers">
                  <Lock className="w-3 h-3" /> 256-bit SSL Encrypted
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#4A4843] block mb-1">Full Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD9CE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#191919] text-[#191919]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#4A4843] block mb-1">Email for Tracking Updates</label>
                  <input
                    type="email"
                    required
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD9CE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#191919] text-[#191919]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#4A4843] block mb-1">Phone (Courier Contact)</label>
                  <input
                    type="tel"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD9CE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#191919] text-[#191919]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#4A4843] block mb-1">Country / Region</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD9CE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#191919] text-[#191919]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#4A4843] block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="Street name, suite or apartment"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD9CE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#191919] text-[#191919]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#4A4843] block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD9CE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#191919] text-[#191919]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#4A4843] block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD9CE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#191919] text-[#191919]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#191919] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#33312D] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Continue to Shipping & Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Delivery Method & Payment */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              {/* Shipping Method Selection */}
              <div>
                <h3 className="text-base font-semibold text-[#191919] mb-3">2. Choose Delivery Method</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setShippingMethod('standard')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-[#191919] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#DDD9CE] hover:border-[#B8B4A8]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#191919]">Carbon-Neutral Courier</span>
                      <span className="text-xs font-bold font-mono-numbers text-[#191919]">
                        {baseShipping === 0 ? 'Free' : `$${baseShipping.toFixed(2)}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#737067] mt-1">Estimated 3–5 business days</p>
                  </div>

                  <div
                    onClick={() => setShippingMethod('express')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-[#191919] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#DDD9CE] hover:border-[#B8B4A8]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#191919]">Studio Express Courier</span>
                      <span className="text-xs font-bold font-mono-numbers text-[#191919]">
                        +${(baseShipping + 25).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#737067] mt-1">Guaranteed 1–2 business days</p>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <h3 className="text-base font-semibold text-[#191919] mb-3">3. Payment Option</h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#191919] bg-[#191919] text-white shadow-xs'
                        : 'border-[#DDD9CE] bg-[#FAF8F5] text-[#4A4843] hover:border-[#191919]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'wallet'
                        ? 'border-[#191919] bg-[#191919] text-white shadow-xs'
                        : 'border-[#DDD9CE] bg-[#FAF8F5] text-[#4A4843] hover:border-[#191919]'
                    }`}
                  >
                    <Lock className="w-4 h-4" />
                    <span>Digital Wallet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#191919] bg-[#191919] text-white shadow-xs'
                        : 'border-[#DDD9CE] bg-[#FAF8F5] text-[#4A4843] hover:border-[#191919]'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Pay on Delivery</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-[#FAF8F5] border border-[#DDD9CE] rounded-xl space-y-3">
                    <div>
                      <label className="text-[11px] font-medium text-[#4A4843] block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#DDD9CE] rounded-lg font-mono-numbers text-[#191919]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-[#4A4843] block mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#DDD9CE] rounded-lg font-mono-numbers text-[#191919]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-[#4A4843] block mb-1">CVC Security</label>
                        <input
                          type="text"
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#DDD9CE] rounded-lg font-mono-numbers text-[#191919]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="p-4 bg-[#FAF8F5] border border-[#DDD9CE] rounded-xl text-center space-y-2">
                    <p className="text-xs text-[#5A5852]">
                      Your digital wallet (Apple Pay / Google Pay) will be securely authorized upon order review.
                    </p>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-[#F5F2EB] border border-[#DDD9CE] rounded-xl text-xs text-[#5A5852] space-y-1">
                    <p className="font-semibold text-[#191919]">Cash on Delivery Terms:</p>
                    <p>
                      You will pay exactly <strong className="text-[#191919] font-mono-numbers">${grandTotal.toFixed(2)}</strong> directly to the courier upon delivery. Please ensure exact cash or mobile terminal ready.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium text-[#737067] hover:text-[#191919] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#191919] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#33312D] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Review Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Review & Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-[#191919]">Review & Authorize Order</h3>

              {/* Order Items Summary */}
              <div className="border border-[#E8E6DF] rounded-xl p-4 bg-[#FAF8F5] space-y-3">
                <div className="text-xs font-semibold text-[#737067] uppercase tracking-wider">
                  Archival Objects ({items.reduce((s, i) => s + i.quantity, 0)})
                </div>
                <div className="divide-y divide-[#E8E6DF] max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-cover rounded bg-[#EAE6DC]"
                        />
                        <div>
                          <p className="font-medium text-[#191919]">{item.product.name}</p>
                          <p className="text-[11px] text-[#737067]">
                            Qty: {item.quantity} {item.selectedVariant ? `· ${item.selectedVariant}` : ''}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono-numbers font-semibold text-[#191919]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination & Payment Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E6DF]">
                  <span className="text-[#737067] font-medium block mb-1">Delivering To</span>
                  <p className="font-semibold text-[#191919]">{shippingAddress.fullName}</p>
                  <p className="text-[#5A5852]">{shippingAddress.address}</p>
                  <p className="text-[#5A5852]">{shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
                  <p className="text-[#737067] text-[11px] mt-1">{shippingAddress.email}</p>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E6DF]">
                  <span className="text-[#737067] font-medium block mb-1">Payment & Shipping</span>
                  <p className="font-semibold text-[#191919]">
                    {paymentMethod === 'card'
                      ? 'Credit Card (Ending 4242)'
                      : paymentMethod === 'wallet'
                      ? 'Apple / Google Pay'
                      : 'Cash on Delivery'}
                  </p>
                  <p className="text-[#5A5852] mt-1">
                    {shippingMethod === 'express' ? 'Studio Express (1-2 Days)' : 'Standard Carbon-Neutral (3-5 Days)'}
                  </p>
                </div>
              </div>

              {/* Financial Totals */}
              <div className="p-4 bg-[#F4F2EB] rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5A5852]">
                  <span>Subtotal</span>
                  <span className="font-mono-numbers">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2E5E4E]">
                    <span>Discount {discountCode ? `(${discountCode})` : ''}</span>
                    <span className="font-mono-numbers">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#5A5852]">
                  <span>Courier Delivery</span>
                  <span className="font-mono-numbers">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#191919] pt-2 border-t border-[#DDD9CE]">
                  <span>Total Due</span>
                  <span className="font-mono-numbers">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-medium text-[#737067] hover:text-[#191919] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#191919] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#33312D] transition-all flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 font-mono-numbers">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authorizing Order...
                    </span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm & Place Order · ${grandTotal.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
