import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Components/Home";
import Books from "./Components/Books";
import Reader from "./Components/Reader/Reader";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/book/:bookSlug"
          element={
            <ChakraProvider>
              <Books />
            </ChakraProvider>
          }
        />
        <Route
          path="/read/:bookSlug"
          element={
            <ChakraProvider>
              <Reader />
            </ChakraProvider>
          }
        />
        <Route
          path="/"
          element={
            <ChakraProvider>
              <Home />
            </ChakraProvider>
          }
        />
        <Route
          path="/*"
          element={
            <ChakraProvider>
              <h1>Page not found</h1>
            </ChakraProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
