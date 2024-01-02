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
  Tooltip,
  Image,
  Text,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import Loading from "./Loading";
import { book } from "../common/types";

function Books() {
  const [book, setBook] = useState<book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const toast = useToast();
  const textColor = useColorModeValue("darkAccent.500", "lightBackground");

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

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Center>Error: {error}</Center>;
  }

  return (
    <Center>
      <Card mb={4} width={["90%", "75%", "60%"]}>
        <CardBody>
          <Heading
            color={textColor}
            textAlign="center"
            size={{ base: "md", sm: "lg", md: "xl", lg: "xl" }}
          >
            {book?.title}
          </Heading>
          <Text textAlign="center" size={"sm"}>
            by {book?.author.join(", ")}
          </Text>
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
          <Stack direction="row" spacing={12} justify="center" py={6}>
            <Link as={ReactRouterLink} to="/">
              <Button variant="solid" colorScheme="red">
                Back
              </Button>
            </Link>
            <Tooltip label="Type through the text of the book">
              <Link as={ReactRouterLink} to={`/type/${book?.slug}/`}>
                <Button variant="solid" colorScheme="blue">
                  Type
                </Button>
              </Link>
            </Tooltip>
            <Tooltip label="Read through the book with optional translations">
              <Link as={ReactRouterLink} to={`/read/${book?.slug}/`}>
                <Button variant="solid" colorScheme="green">
                  Read
                </Button>
              </Link>
            </Tooltip>
          </Stack>
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
