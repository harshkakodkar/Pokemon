import React from 'react';

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setItemsPerPage
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg text-white">
      {/* Items per page selector - responsive */}
      <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
        <label htmlFor="items-per-page" className="text-sm sm:text-base font-medium whitespace-nowrap">
          Items per page:
        </label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="w-full sm:w-auto p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Pagination Controls - responsive */}
      <div className="w-full sm:w-auto flex flex-col xs:flex-row gap-3 items-center">
        {/* Mobile compact controls */}
        <div className="flex gap-2 sm:hidden">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 transition text-sm"
          >
            ←
          </button>
          <span className="text-sm font-medium px-3 py-1 bg-gray-700 rounded-full shadow-inner">
            {currentPage}/{totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 transition text-sm"
          >
            →
          </button>
        </div>

        {/* Desktop full controls */}
        <div className="hidden sm:flex gap-3 items-center">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 transition text-sm sm:text-base"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 transition text-sm sm:text-base"
          >
            Prev
          </button>

          <span className="text-sm sm:text-base font-medium px-3 sm:px-4 py-1 sm:py-2 bg-gray-700 rounded-full shadow-inner">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 transition text-sm sm:text-base"
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 transition text-sm sm:text-base"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;