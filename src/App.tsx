/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CartItem, OrderReceipt } from './types';
import { Check, Info } from 'lucide-react';

export default function App() {
  // Catalog & Filter States
  const [activeCategory, setActiveCategory] = useState<string>('All Objects');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Interactive Overlays
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [confirmedReceipt, setConfirmedReceipt] = useState<OrderReceipt | null>(null);

  // Cart & Promo State with initial default item for immediate demonstration
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('VELOURA_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    // Default starter item for instant interactive delight
    return [
      {
        id: 'init-01',
        productId: PRODUCTS[0].id,
        product: PRODUCTS[0],
        quantity: 1,
        selectedVariant: 'Chalk Dune',
      },
    ];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('VELOURA_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [PRODUCTS[1]]; // Pre-save brass pendant
  });

  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2500);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('VELOURA_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('VELOURA_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  // Cart Operations
  const handleAddToCart = (product: Product, quantity = 1, variant?: string) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.productId === product.id && item.selectedVariant === variant
      );

      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex].quantity = Math.min(
          product.stockCount,
          next[existingIndex].quantity + quantity
        );
        return next;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          product,
          quantity,
          selectedVariant: variant || product.variants?.[0]?.options[0],
        };
        return [...prevItems, newItem];
      }
    });

    showToast(`Added ${quantity} × ${product.name} to bag`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from bag');
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed from saved collection`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved ${product.name} to collection`);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from saved list');
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, 1);
    handleRemoveFromWishlist(product.id);
  };

  // Checkout Operations
  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [cartItems]
  );
  const discountAmount = useMemo(
    () => (subtotal * discountPercent) / 100,
    [subtotal, discountPercent]
  );

  const handleOrderComplete = (receipt: OrderReceipt) => {
    setConfirmedReceipt(receipt);
    setCartItems([]);
    setPromoCode('');
    setDiscountPercent(0);
    setIsCheckoutOpen(false);
  };

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== 'All Objects') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleScrollToGrid = () => {
    const el = document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToStory = () => {
    const el = document.getElementById('studio-ethos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#191919]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191919] text-[#FAF8F5] px-4 py-3 rounded-xl shadow-lg border border-[#33312D] text-xs font-medium flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-[#6EE7B7]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onScrollToStory={handleScrollToStory}
      />


      {/* Hero Campaign Section */}
      <Hero
        onExploreClick={handleScrollToGrid}
        onStoryClick={handleScrollToStory}
      />

      {/* Catalog & Shop Section */}
      <main id="catalog-grid" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="space-y-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#737067]">
            <span>Archival Inventory</span>
            <span aria-hidden="true" className="text-[#A3A096]">·</span>
            <span>Hand-numbered editions</span>
          </div>
          <h2 className="text-3xl font-serif-display font-semibold text-[#191919]">
            Current Studio Objects
          </h2>
        </div>

        {/* Filter & Sorting Toolbar */}
        <FilterBar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={filteredProducts.length}
        />

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(prod) => handleAddToCart(prod, 1)}
                onQuickView={setSelectedProduct}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-4 bg-[#FAF8F5] rounded-2xl border border-dashed border-[#DDD9CE] p-8">
            <Info className="w-8 h-8 text-[#8C8980] mx-auto" />
            <h3 className="font-serif-display text-lg font-medium text-[#191919]">
              No objects matched your criteria
            </h3>
            <p className="text-xs text-[#737067] max-w-md mx-auto">
              We couldn't find items matching "{searchQuery}" in {activeCategory}. Try resetting your search or exploring all categories.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All Objects');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#191919] text-[#FAF8F5] text-xs font-semibold rounded-lg hover:bg-[#33312D] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Studio Story & Testimonials Section */}
      <StorySection />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleScrollToGrid();
        }}
        onScrollToStory={handleScrollToStory}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => setIsCheckoutOpen(true)}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        discountPercent={discountPercent}
        setDiscountPercent={setDiscountPercent}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveWishlistToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discount={discountAmount}
        discountCode={promoCode}
        onOrderComplete={handleOrderComplete}
      />

      <OrderConfirmationModal
        receipt={confirmedReceipt}
        onClose={() => setConfirmedReceipt(null)}
      />
    </div>
  );
}
