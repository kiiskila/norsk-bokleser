import {
  useColorMode,
  Card,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  VStack,
} from "@chakra-ui/react";

const Settings: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Card p={4} m={4}>
      <VStack spacing={4} align="stretch">
        <Heading textAlign={"center"} mb={4}>
          Settings
        </Heading>
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
    </Card>
  );
};

export default Settings;
