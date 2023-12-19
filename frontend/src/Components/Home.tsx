import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import Loading from "./Loading";
import { book } from "../common/types";

function Home() {
  const [bookList, setBookList] = useState<book[]>([]);

  const fetchBookList = async () => {
    const response = await fetch("books");

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const books = await response.json();

    setBookList(books);
  };

  useEffect(() => {
    fetchBookList();
  }, []);

  return !!bookList ? (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {bookList.map((book: book) => {
        return (
          <Card key={book.id}>
            <Link as={ReactRouterLink} to={`/book/${book.slug}`}>
              <CardHeader>
                <Heading size="md">{book.title}</Heading>
              </CardHeader>
            </Link>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Image
                  src={book.cover_art}
                  alt="book cover art"
                  borderRadius="lg"
                />
                <Box>
                  <Heading size="sm" textTransform="uppercase">
                    Sammendrag
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Sammendrag av boken på norsk
                  </Text>
                </Box>
                <Box>
                  <Heading size="sm" textTransform="uppercase">
                    Summary
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Summary of the book in English
                  </Text>
                </Box>
                <Box>
                  <Heading size="sm" textTransform="uppercase">
                    Details
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    <Text as="b">Published: </Text>
                    {new Date(book.published_date || "").toLocaleDateString()}
                  </Text>
                  <Text pt="2" fontSize="sm">
                    <Text as="b">ISBN: </Text>
                    {book.isbn}
                  </Text>
                  <Text pt="2" fontSize="sm">
                    <Text as="b">Author: </Text>
                    {book.author.join(", ")}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
  ) : (
    <Loading />
  );
}

export default Home;
