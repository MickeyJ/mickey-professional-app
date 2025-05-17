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
        className="cursor-pointer border-1 rounded px-1 ml-2 font-bold text-info hover:text-white transition-color duration-200"
      >
        {'<'}
      </button>
      <span className="w-40 text-sm text-dim text-center">
        Page {currentPage} of {lastPage}
      </span>
      <button
        disabled={currentPage === lastPage}
        onClick={() => handlePageChange(currentPage + 1)}
        className="cursor-pointer border-1 rounded px-1 ml-2 font-bold text-info hover:text-white transition-color duration-200"
      >
        {'>'}
      </button>
    </div>
  );
}
