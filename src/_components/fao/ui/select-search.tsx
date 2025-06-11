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
  persistInput?: boolean;
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
  }, [persistInput, setSearchInput]);

  return (
    <div
      className={`form-field ${className}`}
      ref={containerRef}
    >
      {label && <label className="form-label">{label}</label>}

      <button
        type="button"
        className="form-select-trigger"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        {selected ? (
          <span className="truncate text-accent-primary font-medium">{selected.label}</span>
        ) : (
          <span className="placeholder-text">{placeholder}</span>
        )}

        <svg
          className={`h-5 w-5 transition-transform duration-200 ${
            dropdownVisible ? 'rotate-180' : ''
          }`}
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

      {/* Dropdown */}
      {dropdownVisible && (
        <div className="dropdown-container">
          <div className="dropdown-search">
            <input
              type="text"
              className="form-input"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>

          <div className="dropdown-list">
            {loading ? (
              <div className="dropdown-empty">
                <LoadingSpinner />
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((item) => {
                const isSelected = selected?.value === item.value;
                return (
                  <div
                    key={item.value}
                    className={`dropdown-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      onSelect(item.value);
                      !persistInput && setSearchInput('');
                      setDropdownVisible(false);
                    }}
                  >
                    {item.label}
                  </div>
                );
              })
            ) : (
              <div className="dropdown-empty">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
