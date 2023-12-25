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
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Loading from "./Loading";
import { book as BookType } from "../common/types";
import BookListControls from "./BookListControls";

const BookCard = memo(({ book }: { book: BookType }) => (
  <Card key={book.id}>
    <Link as={ReactRouterLink} to={`/book/${book.slug}`}>
      <CardHeader>
        <Heading size="md">{book.title}</Heading>
      </CardHeader>
    </Link>
    <CardBody>
      <Stack divider={<StackDivider />} spacing="4">
        <Image src={book.cover_art} alt="book cover" borderRadius="lg" />
        <DetailSection title="Sammendrag" content="Sammendrag på norsk" />
        <DetailSection title="Summary" content="Summary in English" />
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
));

const DetailSection = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => (
  <Box>
    <Heading size="sm" textTransform="uppercase">
      {title}
    </Heading>
    <Box pt="2" fontSize="sm">
      {content}
    </Box>
  </Box>
);

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

const formatDate = (date: Date | undefined) => {
  return date ? new Date(date).toLocaleDateString() : "Unknown";
};

function Home() {
  const [bookList, setBookList] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "", order: "asc" });
  const toast = useToast();

  const fetchBookList = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams({
        ...(search && { search }),
        ...(sort.field && { sortBy: sort.field, sortOrder: sort.order }),
      }).toString();

      const response = await fetch(`/books?${queryParams}`);
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
        onApplyFilters={fetchBookList}
      />

      {!bookList.length ? (
        <Text>No books available.</Text>
      ) : (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {bookList.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </SimpleGrid>
      )}
    </div>
  );
}

export default Home;
