// Loading Component
// This component is used to indicate to the user that a page or data is currently loading.

import { Center, Spinner, VStack, Text } from "@chakra-ui/react";

function Loading() {
  return (
    // Center aligns its children both horizontally and vertically.
    <Center>
      {/* VStack is used for vertical stacking of components */}
      <VStack spacing={4} align="stretch">
        {/* Text component to display the loading message. */}
        <Center>
          <Text> Loading...</Text>
        </Center>
        {/* Center aligns the Spinner component. */}
        <Center>
          {/* Spinner component from Chakra UI as a visual indication for loading. */}
          <Spinner
            thickness="4px" // Thickness of the spinner ring.
            speed="0.65s" // Duration of the animation.
            emptyColor="gray.200" // Color of the empty part of the spinner.
            color="blue.500" // Color of the filled part of the spinner.
            size="xl" // Size of the spinner.
          />
        </Center>
      </VStack>
    </Center>
  );
}

export default Loading;
