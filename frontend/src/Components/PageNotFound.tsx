// PageNotFound Component
// This component displays a 404 Not Found message to users when they navigate to a URL
// that does not correspond to any page in the application.

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
  // Adjust the text color based on the current color mode (light or dark).
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
        {/* Display the error code (404) */}
        <Heading color={textColor}>404</Heading>
        {/* Error message indicating the page was not found */}
        <Text textAlign={"center"} fontSize="xl" color={textColor} px={4}>
          Ooops! The page you're looking for was not found.
        </Text>
        {/* Navigation button to return to the home page */}
        <Button colorScheme="teal" as={Link} to="/">
          Go Home
        </Button>
      </VStack>
    </Box>
  );
};

export default PageNotFound;
