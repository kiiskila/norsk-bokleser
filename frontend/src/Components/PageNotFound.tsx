import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <Box
      width="100vw"
      minHeight="calc(100vh - 200px)" // Assuming the navbar height is 60px
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4}>
        <Heading color={"darkText"}>404</Heading>
        <Text textAlign={"center"} fontSize="xl" color={"darkText"} px={4}>
          Ooops! The page you're looking for was not found.
        </Text>
        <Button colorScheme="teal" as={Link} to="/">
          Go Home
        </Button>
      </VStack>
    </Box>
  );
};

export default PageNotFound;
