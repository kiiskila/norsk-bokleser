import { Button, Card, CardBody, Center, Heading } from "@chakra-ui/react";

function Books() {
  return (
    <Center>
      <Card mt={12} width={"lg"}>
        <CardBody>
          <Heading>Book One</Heading>
          <Center>
            <Button variant="solid" colorScheme="blue">
              Read
            </Button>
          </Center>
        </CardBody>
      </Card>
    </Center>
  );
}

export default Books;
