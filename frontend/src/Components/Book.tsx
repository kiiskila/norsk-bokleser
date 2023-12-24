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

  const fetchBook = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/book/${params.bookSlug}`);
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
      <Card mt={12} width={["90%", "75%", "60%"]}>
        <CardBody>
          <Heading
            textAlign="center"
            size={{ base: "md", sm: "lg", md: "xl", lg: "xl" }}
          >
            {book?.title}
          </Heading>
          <Stack direction="row" spacing={4} justify="center" pt={6}>
            <Link as={ReactRouterLink} to="/">
              <Button variant="solid" colorScheme="blue">
                Back
              </Button>
            </Link>
            <Link as={ReactRouterLink} to={`/read/${book?.slug}/`}>
              <Button variant="solid" colorScheme="green">
                Read
              </Button>
            </Link>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
}

export default Books;
