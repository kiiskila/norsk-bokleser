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
} from "@chakra-ui/react";

interface book {
  id: number;
  slug: string;
  title: string;
  author: string[];
  isbn?: string;
  cover_art?: string;
  published_date?: Date;
  createdAt: Date;
  updatedAt: Date;
}

function Home() {
  const [bookList, setBookList] = useState<book[]>([]);

  const fetchBookList = () => {
    fetch("books")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setBookList(data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    fetchBookList();
  }, []);

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {bookList.map((book: book) => {
        return (
          <Card key={book.id}>
            <CardHeader>
              <Heading size="md">{book.title}</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Sammendrag
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Sammendrag av boken på norsk
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Summary
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Summary of the book in English
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Details
                  </Heading>
                  <Text pt="2" fontSize="sm"></Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}

export default Home;
