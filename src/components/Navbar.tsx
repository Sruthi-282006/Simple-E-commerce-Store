import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onScrollToStory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  activeCategory,
  searchQuery,
  setSearchQuery,
  onScrollToStory,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'All Objects', category: 'All Objects' },
    { label: 'Lighting', category: 'Lighting' },
    { label: 'Ceramics', category: 'Ceramics & Glass' },
    { label: 'Furniture', category: 'Furniture' },
    { label: 'Textiles', category: 'Textiles' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#E8E6DF] transition-all">
      {/* Top Notification Bar */}
      <div className="bg-[#191919] text-[#EFECE6] text-xs font-medium py-1.5 px-4 text-center tracking-wide">
        <span className="font-mono-numbers">Autumn Studio Dispatch</span>
        <span className="mx-2 text-[#7C7A74]">/</span>
        <span>Complimentary carbon-neutral courier delivery on orders over $200</span>
      </div>

      {/* Main Top Bar (Strict 3-zone contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            onSelectCategory('All Objects');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-bold tracking-tight text-[#191919] whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity font-serif-display text-left"
        >
          <a href="/" className="brand-logo">
            <span className="brand-name">VELOURA</span>
            <span className="brand-tagline">
              THOUGHTFULLY CHOSEN LIVING
            </span>
          </a>
        </button>
        

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A4843]">
          {navLinks.map((link) => (
            <button
              key={link.category}
              onClick={() => {
                onSelectCategory(link.category);
                const grid = document.getElementById('catalog-grid');
                if (grid) grid.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#191919] transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 cursor-pointer ${
                activeCategory === link.category
                  ? 'border-[#191919] text-[#191919] font-semibold'
                  : 'border-transparent text-[#5A5852]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onScrollToStory}
            className="hover:text-[#191919] transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 border-transparent text-[#5A5852] cursor-pointer"
          >
            Studio Ethos
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Search, Wishlist, Cart) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-[#4A4843] hover:text-[#191919] hover:bg-[#F2EFE9] rounded-full transition-colors cursor-pointer"
            aria-label="Search catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#4A4843] hover:text-[#191919] hover:bg-[#F2EFE9] rounded-full transition-colors relative cursor-pointer"
            aria-label="View wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C25E3E] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono-numbers">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Bag / Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2 bg-[#191919] text-[#FAF8F5] rounded-lg hover:bg-[#33312D] transition-colors shadow-xs cursor-pointer"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wide uppercase hidden sm:inline">Bag</span>
            <span className="text-xs font-mono-numbers bg-[#33312D] text-[#FAF8F5] px-1.5 py-0.5 rounded text-center min-w-[20px]">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A4843] hover:text-[#191919] rounded-lg"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expanded Live Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-[#E8E6DF] bg-[#FAF8F5] px-4 py-3 sm:px-6">
          <div className="max-w-2xl mx-auto relative flex items-center">
            <Search className="w-4 h-4 text-[#8C8980] absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search handcrafted objects, lighting, ceramics, textiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-9 pr-10 py-2 text-sm bg-white border border-[#DDD9CE] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#191919] text-[#191919] placeholder-[#9E9B93]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-[#8C8980] hover:text-[#191919]"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E6DF] bg-[#FBFBFA] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.category}
              onClick={() => {
                onSelectCategory(link.category);
                setMobileMenuOpen(false);
                const grid = document.getElementById('catalog-grid');
                if (grid) grid.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-[#2C2A26] hover:bg-[#F2EFE9] rounded-md"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToStory();
            }}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-[#2C2A26] hover:bg-[#F2EFE9] rounded-md"
          >
            Studio Ethos & Provenance
          </button>
        </div>
      )}
    </header>
  );
};
