import {
  useColorMode,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  VStack,
} from "@chakra-ui/react";

const Settings: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Heading mb={4}>Settings</Heading>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="theme-toggle" mb="0">
            {colorMode === "light" ? "Dark" : "Light"} Mode
          </FormLabel>
          <Switch
            id="theme-toggle"
            onChange={toggleColorMode}
            isChecked={colorMode === "dark"}
          />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default Settings;
