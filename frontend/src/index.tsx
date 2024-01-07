// Importing necessary modules and components
import { StrictMode } from "react"; // Importing StrictMode from React for highlighting potential problems
import ReactDOM from "react-dom/client"; // Importing ReactDOM for rendering the application
import App from "./App"; // Main App component
import { ChakraProvider } from "@chakra-ui/react"; // Importing ChakraProvider for Chakra UI styling
import customTheme from "./utils/theme"; // Custom theme settings for Chakra UI

// Creating the root element for the React application
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement // Targeting the 'root' div in the HTML to mount the React app
);

// Rendering the application
root.render(
  <StrictMode>
    {/* StrictMode is used to enable additional checks and warnings in development */}
    <ChakraProvider theme={customTheme}>
      {/* ChakraProvider wraps the app providing theme information */}
      <App /> {/* The main App component is rendered here */}
    </ChakraProvider>
  </StrictMode>
);
