// Settings Component
// This component provides a user interface for application settings.
// Currently, it allows users to toggle between light and dark color modes.

import {
  useColorMode,
  useColorModeValue,
  Card,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  VStack,
} from "@chakra-ui/react";

const Settings: React.FC = () => {
  // useColorMode hook from Chakra UI to manage and toggle color modes
  const { colorMode, toggleColorMode } = useColorMode();

  // Dynamically setting the background color of the card based on the current color mode
  const cardBgColor = useColorModeValue("cardWhiteBg", "gray.700");

  return (
    <Card p={4} m={4} bg={cardBgColor}>
      <VStack spacing={4} align="stretch">
        <Heading textAlign={"center"} mb={4}>
          Settings
        </Heading>
        {/* FormControl for the color mode switch */}
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="theme-toggle" mb="0">
            {/* Label changes based on the current mode */}
            {colorMode === "light" ? "Dark" : "Light"} Mode
          </FormLabel>
          {/* Switch component for toggling color mode */}
          <Switch
            id="theme-toggle"
            onChange={toggleColorMode}
            isChecked={colorMode === "dark"}
          />
        </FormControl>
      </VStack>
    </Card>
  );
};

export default Settings;
