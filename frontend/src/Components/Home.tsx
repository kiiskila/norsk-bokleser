// Home Page and Book Card Components
// This file contains the Home component, which is the main page of the application,
// and several sub-components used within it to display a list of books and their details.

import React, { useEffect, useState, useCallback, memo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Text,
  Heading,
  Stack,
  StackDivider,
  Box,
  SimpleGrid,
  Link,
  useToast,
  Center,
  Collapse,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Loading from "./Loading";
import { book as BookType } from "../common/types";
import BookListControls from "./BookListControls";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";

// BookCard Component
// Renders a single book card displaying key details such as the title, cover, and summary.
// Clicking on the card navigates the user to a detailed view of the book.
const BookCard = memo(({ book }: { book: BookType }) => {
  const cardBgColor = useColorModeValue("cardWhiteBg", "gray.700");

  return (
    <Card key={book.id} bg={cardBgColor}>
      <Link as={ReactRouterLink} to={`/book/${book.slug}`}>
        <CardHeader>
          <Heading textAlign={"center"} size="md">
            {book.title}
          </Heading>
        </CardHeader>
      </Link>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Link as={ReactRouterLink} to={`/book/${book.slug}`}>
            <Image
              margin={"auto"}
              src={book.cover_art}
              alt="book cover"
              borderRadius="lg"
              maxWidth="300px"
              maxHeight="300px"
              height="200px"
              objectFit="contain"
            />
          </Link>

          <DetailSection title="Sammendrag" content={book.summary_norwegian} />
          <DetailSection title="Summary" content={book.summary_english} />
          <DetailSection
            title="Details"
            content={
              <>
                <DetailItem
                  label="Published"
                  value={formatDate(book.published_date)}
                />
                <DetailItem label="ISBN" value={book.isbn || "Unknown"} />
                <DetailItem label="Author" value={book.author.join(", ")} />
              </>
            }
          />
        </Stack>
      </CardBody>
    </Card>
  );
});

// DetailSection Component
// A collapsible section used within the BookCard to display detailed information.
// The section can be toggled to show or hide its contents.
const DetailSection = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => {
  const [show, setShow] = React.useState(title === "Details");
  const cardBgColor = useColorModeValue("cardWhiteBg", "gray.700");
  const handleToggle = () => setShow(!show);

  return (
    <Box>
      <Heading
        size="sm"
        textTransform="uppercase"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {title}
        {title !== "Details" && (
          <IconButton
            aria-label={show ? "Collapse" : "Expand"}
            icon={show ? <ChevronDownIcon /> : <ChevronRightIcon />}
            size="xs"
            bg={cardBgColor}
            onClick={handleToggle}
          />
        )}
      </Heading>
      <Collapse
        in={show}
        style={{ display: title === "Details" ? "block" : "" }}
      >
        <Box pt="2" fontSize="sm">
          {content}
        </Box>
      </Collapse>
    </Box>
  );
};

// DetailItem Component
// Displays a single piece of information (label and value) in the DetailSection.
const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => (
  <Box fontSize="sm">
    <Text as="b">{label}: </Text>
    {value || "Unknown"}
  </Box>
);

// formatDate Function
// Utility function to format a Date object into a readable string.
// Returns "Unknown" if the date is not provided.
const formatDate = (date: Date | undefined) => {
  return date ? new Date(date).toLocaleDateString() : "Unknown";
};

// Home Component
// The main component of the application's home page.
// It displays a searchable and sortable list of books.
function Home() {
  const [bookList, setBookList] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "title", order: "asc" });
  const toast = useToast();

  // Fetching book list from the server
  const fetchBookList = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams({
        ...(search && { search }),
        ...(sort.field && { sortBy: sort.field, sortOrder: sort.order }),
      }).toString();

      const response = await fetch(
        `${process.env.REACT_APP_PROXY_URL}/books?${queryParams}`
      );
      if (!response.ok) {
        const resMessage =
          response.status === 404 ? "No books found" : "Internal server error";
        throw new Error(resMessage);
      }
      const books = await response.json();
      setBookList(books);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, search, sort]);

  useEffect(() => {
    fetchBookList();
  }, [fetchBookList]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <BookListControls
        search={search}
        sort={sort}
        onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        onSortFieldChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSort({ ...sort, field: e.target.value })
        }
        onSortOrderChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSort({ ...sort, order: e.target.value })
        }
      />

      {!bookList.length ? (
        <Center>
          <Text>No books found.</Text>
        </Center>
      ) : (
        <Box p={4}>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          >
            {bookList.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </div>
  );
}

export default Home;
