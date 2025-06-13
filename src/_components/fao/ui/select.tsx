import { useEffect, useRef, useState } from 'react';

import { LoadingSpinner } from './loading-spinner';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  loading?: boolean;
  error?: string;
  className?: string;
  persistInput?: boolean;
  options: SelectOption[];
  selected: SelectOption | null;
  onSelect: (option: SelectOption) => void;
}

export function Select({
  label,
  placeholder = 'Select Commodity',
  loading,
  error,
  className = '',
  persistInput,
  options,
  selected,
  onSelect,
}: SelectProps) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [persistInput]);

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
          <div className="dropdown-list">
            {loading ? (
              <div className="dropdown-empty">
                <LoadingSpinner />
              </div>
            ) : options.length > 0 ? (
              options.map((item) => {
                const isSelected = selected?.value === item.value;
                return (
                  <div
                    key={item.value}
                    className={`dropdown-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      onSelect(item);
                      setDropdownVisible(false);
                    }}
                  >
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
