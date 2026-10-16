import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface FilterBarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  totalCount,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-[#E8E6DF] mb-8">
      {/* Category Segmented Controls */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#191919] text-[#FAF8F5] shadow-xs'
                  : 'bg-[#F2EFE9] text-[#5A5852] hover:bg-[#EAE6DE] hover:text-[#191919]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Right Controls: Sort & Count */}
      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
        <span className="text-xs text-[#737067] font-mono-numbers">
          {totalCount} {totalCount === 1 ? 'archival object' : 'archival objects'}
        </span>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#737067]" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs font-medium bg-[#F2EFE9] border border-[#DDD9CE] text-[#191919] rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#191919] cursor-pointer"
          >
            <option value="featured">Curated Studio Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
};
