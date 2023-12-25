import React, { useEffect } from "react";
import {
  Input,
  Select,
  Box,
  Flex,
  FormControl,
  FormLabel,
  useBreakpointValue,
} from "@chakra-ui/react";

type BookListControlsProps = {
  search: string;
  sort: { field: string; order: string };
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortFieldChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSortOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const BookListControls: React.FC<BookListControlsProps> = ({
  search,
  sort,
  onSearchChange,
  onSortFieldChange,
  onSortOrderChange,
}) => {
  const flexDir = useBreakpointValue({
    base: "column",
    md: "row",
  }) as any;

  useEffect(() => {
    if (sort.field === "") {
      onSortFieldChange({
        target: { value: "title" },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  }, [sort.field, onSortFieldChange]);

  return (
    <Box p={4}>
      <Flex direction={flexDir} align="center" gap={3}>
        <FormControl flex={1}>
          <FormLabel htmlFor="search">Search Books</FormLabel>
          <Input
            id="search"
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search books..."
          />
        </FormControl>
        <FormControl flex={1}>
          <FormLabel htmlFor="sortField">Sort By</FormLabel>
          <Select
            id="sortField"
            value={sort.field}
            onChange={onSortFieldChange}
            placeholder="Select field"
          >
            <option value="title">Title</option>
            <option value="published_date">Published Date</option>
          </Select>
        </FormControl>
        <FormControl flex={1}>
          <FormLabel htmlFor="sortOrder">Order</FormLabel>
          <Select
            id="sortOrder"
            value={sort.order}
            onChange={onSortOrderChange}
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
