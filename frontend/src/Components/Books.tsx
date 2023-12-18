import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Center,
  Heading,
  Link,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";

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

function Books() {
  const [book, setBook] = useState<book>();
  const params = useParams();

  const fetchBook = () => {
    fetch(`${params.bookSlug}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <>
      <Center backgroundColor={"blue.50"} h={"100vh"}>
        <Card mt={12} width={"lg"}>
          <CardBody>
            <Heading>{book?.id}</Heading>
            <Center>
              <Link as={ReactRouterLink} to={`/book/`}>
                <Button variant="solid" colorScheme="blue">
                  Read
                </Button>
              </Link>
            </Center>
          </CardBody>
        </Card>
      </Center>
    </>
  );
}

export default Books;
