import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  totalPages?: number | null;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  isLoading,
  totalPages,
}) => {
  const handlePageChange = (pageNumber: number): void => {
    if (!isLoading) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="flex items-center justify-end px-6 py-4 border-t">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="px-3 py-2 rounded-md text-sm  hover:bg-accent-1 text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="inline w-4 h-4" />
        </button>
        <span className="text-sm text-gray-500 font-semibold">
          Page {currentPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            isLoading ||
            (typeof totalPages === "number" && currentPage >= totalPages)
          }
          className="text-sm hover:bg-accent-1 text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="inline w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
