import React from "react";

type BookListControlsProps = {
  search: string;
  sort: { field: string; order: string };
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortFieldChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSortOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onApplyFilters: () => void;
};

const BookListControls: React.FC<BookListControlsProps> = ({
  search,
  sort,
  onSearchChange,
  onSortFieldChange,
  onSortOrderChange,
  onApplyFilters,
}) => {
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={onSearchChange}
        placeholder="Search books..."
      />
      <select value={sort.field} onChange={onSortFieldChange}>
        <option value="">Sort By</option>
        <option value="title">Title</option>
        <option value="published_date">Published Date</option>
      </select>
      <select value={sort.order} onChange={onSortOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button onClick={onApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default BookListControls;
