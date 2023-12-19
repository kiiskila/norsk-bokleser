import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Books from "./Components/Books";
import Reader from "./Components/Reader/Reader";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/book/:bookSlug"
          element={
            <>
              <Navbar />
              <Books />
            </>
          }
        />
        <Route
          path="/read/:bookSlug"
          element={
            <>
              <Navbar />
              <Reader />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <h1>Page not found</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
