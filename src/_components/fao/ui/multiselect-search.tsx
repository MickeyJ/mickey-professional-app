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
  error?: string;
  maxSelected?: number;
  className?: string;
  showSelectedMessage?: string;
  options: SelectOption[];
  selected: SelectOption[];
  onSelect: (selectedOptions: SelectOption[]) => void;
  getItemColor?: (item: SelectOption, index: number) => string; // Optional function to get color for each item
}

export function MultiSelectSearch({
  label,
  placeholder = 'Select Locations',
  loading,
  error,
  maxSelected = 5,
  className = '',
  showSelectedMessage,
  options,
  selected,
  onSelect,
  getItemColor, // Function to get color for each item
}: SelectSearchProps) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(options);
  const containerRef = useRef<HTMLDivElement>(null);

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
        setSearchInput('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle selection of an option
  const toggleOption = (option: SelectOption) => {
    const isSelected = selected.some((item) => item.value === option.value);

    if (!isSelected && selected.length === maxSelected) {
      return;
    }

    let newSelected;
    if (isSelected) {
      newSelected = selected.filter((item) => item.value !== option.value);
    } else {
      newSelected = [...selected, option];
    }

    onSelect(newSelected);
  };

  // Remove a selected option
  const removeOption = (option: SelectOption, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(selected.filter((item) => item.value !== option.value));
  };

  // Clear all selections
  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect([]);
  };

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
        <div className="tag-container">
          {!showSelectedMessage &&
            selected.length > 0 &&
            selected.map((item) => (
              <div
                key={item.value}
                className="tag-pill"
              >
                <span className="tag-label">{item.label}</span>
                <span
                  className="tag-remove"
                  onClick={(e) => removeOption(item, e)}
                >
                  ✕
                </span>
              </div>
            ))}
          {showSelectedMessage && selected.length > 0 && (
            <span className="selected-count">{showSelectedMessage}</span>
          )}
          {selected.length === 0 && <span className="placeholder-text">{placeholder}</span>}
        </div>

        <div className="absolute right-2 flex items-center gap-2">
          {selected.length > 0 && (
            <span
              className="clear-button"
              onClick={clearAll}
            >
              Clear
            </span>
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
        </div>
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
              filteredOptions.map((item, i) => {
                const isSelected = selected.some((option) => option.value === item.value);
                return (
                  <div
                    key={item.value}
                    className={`dropdown-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleOption(item)}
                    style={
                      getItemColor
                        ? {
                            color: getItemColor(item, i),
                            // fontStyle: 'bold',
                            fontWeight: 700,
                          }
                        : {}
                    }
                  >
                    <input
                      type="checkbox"
                      className="checkbox-custom"
                      checked={isSelected}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                    {item.label}
                  </div>
                );
              })
            ) : error ? (
              <div className="dropdown-empty text-error">{error}</div>
            ) : (
              <div className="dropdown-empty">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
