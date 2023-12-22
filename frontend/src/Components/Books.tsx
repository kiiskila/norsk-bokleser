import { useEffect, useState, useCallback } from "react";
import {
  Button,
  Card,
  CardBody,
  Center,
  Heading,
  Link,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import Loading from "./Loading";
import { book } from "../common/types";

function Books() {
  const [book, setBook] = useState<book>();
  const params = useParams();
  const toast = useToast();

  const fetchBook = useCallback(async () => {
    try {
      const response = await fetch(`/book/${params.bookSlug}`);
      const resMessage =
        response.status === 404 ? "Book not found" : "Internal server error";
      if (!response.ok) {
        toast({
          title: "Error",
          description: resMessage,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        const data = await response.json();
        setBook(data);
      }
    } catch (error) {}
  }, [params.bookSlug, toast]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  return !!book ? (
    <>
      <Center>
        <Card mt={12} width={"lg"}>
          <CardBody>
            <Heading>{book?.title}</Heading>
            <Center>
              <Link as={ReactRouterLink} to={`/read/${book.slug}/`}>
                <Button variant="solid" colorScheme="red">
                  Read
                </Button>
              </Link>
            </Center>
          </CardBody>
        </Card>
      </Center>
    </>
  ) : (
    <Loading />
  );
}

export default Books;
