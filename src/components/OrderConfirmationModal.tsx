import React from 'react';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { OrderReceipt } from '../types';

interface OrderConfirmationModalProps {
  receipt: OrderReceipt | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  receipt,
  onClose,
}) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#DDD9CE] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Header */}
        <div className="p-8 bg-[#FAF8F5] border-b border-[#E8E6DF] text-center space-y-3">
          <div className="w-14 h-14 bg-[#2E5E4E]/10 text-[#2E5E4E] rounded-full mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2E5E4E] font-mono-numbers">
              Payment & Dispatch Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-semibold text-[#191919] mt-1">
              Thank you for your order
            </h2>
            <p className="text-xs text-[#737067] mt-1">
              A studio confirmation and tracking link have been dispatched to{' '}
              <strong className="text-[#191919]">{receipt.shippingAddress.email}</strong>
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#DDD9CE] rounded-lg text-xs font-mono-numbers text-[#191919]">
            <span className="text-[#737067]">Order Reference:</span>
            <span className="font-bold">{receipt.orderId}</span>
          </div>
        </div>

        {/* Order Progress Status Bar */}
        <div className="px-6 py-4 bg-[#F5F2EB] border-b border-[#E8E6DF]">
          <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-medium text-[#4A4843]">
            <div className="text-[#2E5E4E] font-semibold flex flex-col items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#2E5E4E]" />
              <span>Confirmed</span>
            </div>
            <div className="text-[#191919] font-semibold flex flex-col items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#191919]" />
              <span>Studio Packing</span>
            </div>
            <div className="text-[#8C8980] flex flex-col items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#DDD9CE]" />
              <span>Courier Transit</span>
            </div>
            <div className="text-[#8C8980] flex flex-col items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#DDD9CE]" />
              <span>Delivered</span>
            </div>
          </div>
        </div>

        {/* Order Receipt Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Purchased Items */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737067]">
              Archival Objects in Shipment
            </h3>
            <div className="divide-y divide-[#F0EEE6]">
              {receipt.items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded-lg bg-[#F4F2EB]"
                    />
                    <div>
                      <h4 className="font-medium text-[#191919]">{item.product.name}</h4>
                      <p className="text-[11px] text-[#737067]">
                        Quantity: {item.quantity} {item.selectedVariant ? `· Finish: ${item.selectedVariant}` : ''}
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

          {/* Delivery & Billing Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E6DF]">
              <div className="flex items-center gap-1.5 text-[#737067] font-medium mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Delivery Address</span>
              </div>
              <p className="font-semibold text-[#191919]">{receipt.shippingAddress.fullName}</p>
              <p className="text-[#5A5852]">{receipt.shippingAddress.address}</p>
              <p className="text-[#5A5852]">
                {receipt.shippingAddress.city}, {receipt.shippingAddress.postalCode}, {receipt.shippingAddress.country}
              </p>
              <p className="text-[#737067] text-[11px] mt-1">Est. Delivery: {receipt.deliveryEstimate}</p>
            </div>

            <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E6DF]">
              <div className="flex items-center gap-1.5 text-[#737067] font-medium mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Payment Summary</span>
              </div>
              <p className="font-semibold text-[#191919]">{receipt.paymentMethod}</p>
              <div className="mt-2 space-y-1 text-[#5A5852] font-mono-numbers">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${receipt.subtotal.toFixed(2)}</span>
                </div>
                {receipt.discount > 0 && (
                  <div className="flex justify-between text-[#2E5E4E]">
                    <span>Discount:</span>
                    <span>-${receipt.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier:</span>
                  <span>{receipt.shipping === 0 ? 'Complimentary' : `$${receipt.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-[#191919] pt-1 border-t border-[#DDD9CE]">
                  <span>Total Paid:</span>
                  <span>${receipt.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#E8E6DF] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-[#DDD9CE] hover:border-[#191919] text-xs font-medium text-[#4A4843] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#191919] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#33312D] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
