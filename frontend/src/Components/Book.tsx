// Books Component
// This component is used for displaying details of a specific book.
// It fetches book data based on the bookSlug parameter from the URL.

import { useEffect, useState, useCallback } from "react";
import {
  Button,
  Card,
  CardBody,
  Center,
  Heading,
  Link,
  Stack,
  useToast,
  Image,
  Text,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import Loading from "./Loading";
import { book } from "../common/types";
import { ChevronLeftIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";

function Books() {
  // State hooks to manage the book data, loading status, and any errors.
  const [book, setBook] = useState<book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetching URL parameters and initializing Chakra UI hooks.
  const params = useParams();
  const toast = useToast();
  const textColor = useColorModeValue("darkAccent.500", "lightBackground");
  const cardBgColor = useColorModeValue("cardWhiteBg", "gray.700");

  // Fetches book data from the server.
  const fetchBook = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY_URL}/book/${params.bookSlug}`
      );
      if (!response.ok) {
        const resMessage =
          response.status === 404 ? "Book not found" : "Internal server error";
        toast({
          title: "Error",
          description: resMessage,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setError(resMessage);
        setBook(null);
      } else {
        const data = await response.json();
        setBook(data);
        setError(null);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setBook(null);
    } finally {
      setIsLoading(false);
    }
  }, [params.bookSlug, toast]);

  // Effect hook to fetch book data when the component mounts or the bookSlug changes.
  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  // Render loading component while data is being fetched.
  if (isLoading) {
    return <Loading />;
  }

  // Render error message if an error occurred during data fetching.
  if (error) {
    return <Center>Error: {error}</Center>;
  }

  // Main component rendering.
  return (
    <Center>
      <Card mb={4} width={["90%", "75%", "60%"]} bg={cardBgColor}>
        {/* Card body containing book details */}
        <CardBody>
          {/* Book title */}
          <Heading
            color={textColor}
            textAlign="center"
            size={{ base: "md", sm: "lg", md: "xl", lg: "xl" }}
          >
            {book?.title}
          </Heading>

          {/* Book author */}
          <Text textAlign="center" size={"sm"}>
            by {book?.author.join(", ")}
          </Text>

          {/* Book cover image */}
          <Center pt={2}>
            <Image
              src={book?.cover_art}
              alt="book cover"
              borderRadius="lg"
              maxWidth="300px"
              maxHeight="300px"
              objectFit="contain"
            />
          </Center>

          {/* Action buttons */}
          <Stack direction="row" spacing={4} justify="center" py={6}>
            {/* Navigation buttons to different functionalities */}
            <Link as={ReactRouterLink} to="/">
              <Button
                leftIcon={<ChevronLeftIcon />}
                variant="outline"
                colorScheme="teal"
                size="md"
                shadow="sm"
              >
                Back
              </Button>
            </Link>
            <Link as={ReactRouterLink} to={`/type/${book?.slug}/`}>
              <Button
                leftIcon={<EditIcon />}
                variant="outline"
                colorScheme="teal"
                size="md"
                shadow="sm"
              >
                Type
              </Button>
            </Link>
            <Link as={ReactRouterLink} to={`/read/${book?.slug}/`}>
              <Button
                leftIcon={<ViewIcon />}
                variant="outline"
                colorScheme="teal"
                size="md"
                shadow="sm"
              >
                Read
              </Button>
            </Link>
          </Stack>

          {/* Book summaries in Norwegian and English */}
          <Text size={"lg"} as="b">
            Sammendrag
          </Text>
          <Text>{book?.summary_norwegian}</Text>
          <Divider pb={4} mb={2}></Divider>
          <Text size={"lg"} as="b">
            Summary
          </Text>
          <Text>{book?.summary_english}</Text>
        </CardBody>
      </Card>
    </Center>
  );
}

export default Books;
