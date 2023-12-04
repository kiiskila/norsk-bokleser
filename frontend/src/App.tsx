import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <ChakraProvider>
              <Home />
            </ChakraProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
