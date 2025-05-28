import { useEffect, useRef, useState } from 'react';

import { LoadingSpinner } from './loading-spinner';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectSearchProps {
  label?: string;
  placeholder?: string;
  loading?: boolean;
  className?: string;
  persistInput?: boolean; // If true, keeps the search input
  options: SelectOption[];
  selected: SelectOption | null;
  setExternalSearchInput?: (value: string) => void;
  externalSearchInput?: string;
  onSelect: (optionValue: string) => void;
}

export function SelectSearch({
  label,
  placeholder = 'Select Commodity',
  loading,
  className = '',
  persistInput,
  options,
  selected,
  externalSearchInput,
  setExternalSearchInput,
  onSelect,
}: SelectSearchProps) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [internalSearchInput, setInternalSearchInput] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(options);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchInput = externalSearchInput || internalSearchInput;
  const setSearchInput = setExternalSearchInput || setInternalSearchInput;

  useEffect(() => {
    if (searchInput) {
      const lowerCaseInput = searchInput.toLowerCase();
      setFilteredOptions(
        options.filter((option) => option.label.toLowerCase().includes(lowerCaseInput))
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchInput, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
        !persistInput && setSearchInput('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`w-full max-w-md mx-auto relative ${className}`}
      ref={containerRef}
    >
      {/* Custom Select Button */}
      <div className="form-field">
        {label && <label className="form-label">{label}</label>}
        <button
          type="button"
          className="form-select w-full text-left min-h-[40px] flex justify-between items-center"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          {selected ? (
            <span className="truncate text-bright">{selected.label}</span>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
          <svg
            className={`h-5 w-5 transition-transform ${dropdownVisible ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Floating Dropdown */}
      {dropdownVisible && (
        <div className="absolute z-50 w-full mt-1 rounded-md bg-base-100 border border-base-300 shadow-lg max-h-60 overflow-hidden">
          {/* Search input */}
          <div className="sticky top-0 p-2 bg-base-100 border-b border-base-200">
            <input
              type="text"
              className="form-input w-full"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>

          {/* Options list */}
          <div className="overflow-y-auto max-h-48">
            {loading && (
              <div className="p-4 text-center">
                <LoadingSpinner />
              </div>
            )}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <div
                  key={item.value}
                  className="p-2 hover:bg-base-300 cursor-pointer transition-colors"
                  onClick={() => {
                    onSelect(item.value);
                    !persistInput && setSearchInput('');
                    setDropdownVisible(false);
                  }}
                >
                  {item.label}
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-gray-500">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
