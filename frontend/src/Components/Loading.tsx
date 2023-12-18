import { Center, Spinner, VStack, Text } from "@chakra-ui/react";

function Loading() {
  return (
    <Center backgroundColor={"blue.50"} h={"100vh"}>
      <VStack spacing={4} align="stretch">
        <Center>
          <Text> Loading...</Text>
        </Center>
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </VStack>
    </Center>
  );
}

export default Loading;
