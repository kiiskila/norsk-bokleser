import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Components/Home";
import Books from "./Components/Books";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/book/*"
          element={
            <ChakraProvider>
              <Books />
            </ChakraProvider>
          }
        ></Route>
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
