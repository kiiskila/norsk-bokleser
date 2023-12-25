import React, { useEffect } from "react";
import { Input, Select, Box, Flex, useBreakpointValue } from "@chakra-ui/react";

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
        <Input
          type="text"
          value={search}
          onChange={onSearchChange}
          placeholder="Search books..."
          flex={1}
        />
        <Select
          value={sort.field}
          onChange={onSortFieldChange}
          placeholder="Sort By"
          flex={1}
        >
          <option value="title">Title</option>
          <option value="published_date">Published Date</option>
        </Select>
        <Select value={sort.order} onChange={onSortOrderChange} flex={1}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
      </Flex>
    </Box>
  );
};

export default BookListControls;
