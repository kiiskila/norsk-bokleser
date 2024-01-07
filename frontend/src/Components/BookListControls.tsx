// BookListControls Component
// This component provides search and sorting controls for a list of books.

import React, { useEffect } from "react";
import {
  Input,
  Select,
  Box,
  Flex,
  FormControl,
  FormLabel,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

// Types for the props used in the BookListControls component.
type BookListControlsProps = {
  search: string; // The current search query.
  sort: { field: string; order: string }; // Current sorting configuration (field and order).
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle search input changes.
  onSortFieldChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Function to handle changes in sorting field.
  onSortOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Function to handle changes in sorting order.
};

const BookListControls: React.FC<BookListControlsProps> = ({
  search,
  sort,
  onSearchChange,
  onSortFieldChange,
  onSortOrderChange,
}) => {
  // Customizable text color based on the current color mode (dark or light).
  const textColor = useColorModeValue("darkAccent.500", "lightBackground");

  // Responsive flex direction based on the viewport size.
  const flexDir = useBreakpointValue({
    base: "column",
    md: "row",
  }) as any;

  // Effect to set default sort field when none is selected.
  useEffect(() => {
    if (sort.field === "") {
      onSortFieldChange({
        target: { value: "title" },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  }, [sort.field, onSortFieldChange]);

  // Component rendering.
  return (
    <Box p={4}>
      <Flex direction={flexDir} align="center" gap={3}>
        {/* Search input control */}
        <FormControl flex={1}>
          <FormLabel htmlFor="search" color={textColor}>
            Search Books
          </FormLabel>
          <Input
            id="search"
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search books..."
            color={textColor}
          />
        </FormControl>

        {/* Sorting field selection control */}
        <FormControl flex={1}>
          <FormLabel htmlFor="sortField" color={textColor}>
            Sort By
          </FormLabel>
          <Select
            id="sortField"
            value={sort.field}
            onChange={onSortFieldChange}
            placeholder="Select field"
            color={textColor}
          >
            <option value="title">Title</option>
            <option value="published_date">Published Date</option>
          </Select>
        </FormControl>

        {/* Sorting order selection control */}
        <FormControl flex={1}>
          <FormLabel htmlFor="sortOrder" color={textColor}>
            Order
          </FormLabel>
          <Select
            id="sortOrder"
            value={sort.order}
            onChange={onSortOrderChange}
            color={textColor}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </FormControl>
      </Flex>
    </Box>
  );
};

export default BookListControls;
