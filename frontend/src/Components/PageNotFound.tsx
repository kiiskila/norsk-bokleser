import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const textColor = useColorModeValue("darkAccent.500", "lightBackground");

  return (
    <Box
      width="100vw"
      minHeight="calc(100vh - 200px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4}>
        <Heading color={textColor}>404</Heading>
        <Text textAlign={"center"} fontSize="xl" color={textColor} px={4}>
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
