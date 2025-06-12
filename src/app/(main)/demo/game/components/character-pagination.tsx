import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface CharacterPaginationProps {
  currentPage: number;
  lastPage: number;
  handlePageChange: (newPage: number) => void;
}

export default function CharacterPagination({
  currentPage,
  lastPage,
  handlePageChange,
}: CharacterPaginationProps) {
  return (
    <div className="w-full flex flex-row items-center justify-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="cursor-pointer"
      >
        <ChevronLeftIcon className="w-7 h-7 text-white hover:text-info transition-color duration-200" />
      </button>
      <span className="w-40 mr-0.5 text-sm text-dim text-center">
        Page {currentPage} of {lastPage}
      </span>
      <button
        disabled={currentPage === lastPage}
        onClick={() => handlePageChange(currentPage + 1)}
        className="cursor-pointer"
      >
        <ChevronRightIcon className="w-7 h-7 text-white hover:text-info transition-color duration-200" />
      </button>
    </div>
  );
}
