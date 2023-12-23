import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Books from "./Components/Books";
import Reader from "./Components/Reader/Reader";
import Layout from "./Components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/book/:bookSlug"
          element={
            <Layout>
              <Books />
            </Layout>
          }
        />
        <Route
          path="/read/:bookSlug"
          element={
            <Layout>
              <Reader />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/*"
          element={
            <Layout>
              <h1>Page not found</h1>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
