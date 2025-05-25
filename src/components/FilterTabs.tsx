
import React from 'react';

interface FilterTabsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filters: { id: string; label: string }[];
}

const FilterTabs: React.FC<FilterTabsProps> = ({ 
  activeFilter, 
  setActiveFilter, 
  filters 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-6 py-2 rounded-full transition-all ${
            activeFilter === filter.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
