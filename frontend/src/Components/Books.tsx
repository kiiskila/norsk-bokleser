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
import Loading from "./Loading";
import { book } from "../common/types";

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

  return !!book ? (
    <>
      <Center backgroundColor={"lightBackground"} h={"100vh"}>
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
