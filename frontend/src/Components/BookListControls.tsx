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
  const textColor = useColorModeValue("darkAccent.500", "lightBackground");

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
