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
  maxSelected?: number;
  options: SelectOption[];
  selected: SelectOption[];
  onSelect: (selectedOptions: SelectOption[]) => void;
}

export function MultiSelectSearch({
  label,
  placeholder = 'Select Locations',
  loading,
  maxSelected = 5,
  options,
  selected,
  onSelect,
}: SelectSearchProps) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(options);
  const containerRef = useRef<HTMLDivElement>(null);

  console.log(
    `Rendering MultiSelectSearch with ${options.length} options and ${selected.length} selected`
  );

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
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle selection of an option
  const toggleOption = (option: SelectOption) => {
    const isSelected = selected.some((item) => item.value === option.value);

    if (!isSelected && selected.length == maxSelected) {
      return;
    }
    let newSelected;

    console.log(`Toggling option: ${option.label}, currently selected: ${isSelected}`);

    if (isSelected) {
      // Remove from selection
      newSelected = selected.filter((item) => item.value !== option.value);
    } else {
      // Add to selection
      newSelected = [...selected, option];
    }

    console.log(`New selection: ${newSelected.map((item) => item.label).join(', ')}`);

    onSelect(newSelected);
  };

  // Remove a selected option
  const removeOption = (option: SelectOption, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from toggling
    onSelect(selected.filter((item) => item.value !== option.value));
  };

  // Clear all selections
  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from toggling
    onSelect([]);
  };

  return (
    <div
      className="w-full max-w-md mx-auto relative"
      ref={containerRef}
    >
      {/* Custom Select Button */}
      <div className="form-field mb-2">
        {label && <label className="form-label">{label}</label>}
        <button
          type="button"
          className="form-select w-full text-left min-h-[40px] flex justify-between items-center"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <div className="flex flex-wrap gap-1 pr-6">
            {selected.length > 0 ? (
              selected.map((item) => (
                <div
                  key={item.value}
                  className="flex flex-row gap-1 max-w-20 text-xs border-1 border-neutral-700 bg-base-200 px-2 py-1 rounded-md items-center justify-between "
                >
                  <span className="truncate">{item.label}</span>
                  <span
                    className="text-error hover:text-base-content cursor-pointer transition-colors duration-200"
                    onClick={(e) => removeOption(item, e)}
                  >
                    <span className="">✕</span>
                  </span>
                </div>
              ))
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <div className="absolute right-2 flex items-center">
            {selected.length > 0 && (
              <span
                className="mr-2 text-xs text-base-content/70 hover:text-base-content cursor-pointer"
                onClick={(e) => clearAll(e)}
              >
                Clear
              </span>
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
          </div>
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
              filteredOptions.map((item) => {
                const isSelected = selected.some((option) => option.value === item.value);
                return (
                  <div
                    key={item.value}
                    className={`p-2 hover:bg-base-300 cursor-pointer transition-colors flex items-center ${
                      isSelected ? 'bg-base-200' : ''
                    }`}
                    onClick={() => toggleOption(item)}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={isSelected}
                      onChange={() => {}} // Handled by parent div click
                      onClick={(e) => e.stopPropagation()}
                    />
                    {item.label}
                  </div>
                );
              })
            ) : (
              <div className="p-2 text-center text-gray-500">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
