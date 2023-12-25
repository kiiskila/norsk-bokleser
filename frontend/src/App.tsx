import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Books from "./Components/Book";
import Reader from "./Components/Reader/Reader";
import Layout from "./Components/Layout";
import BookRequestForm from "./Components/BookRequestForm";
import ReportIssueForm from "./Components/ReportIssueForm";

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
          path="/request-a-book"
          element={
            <Layout>
              <BookRequestForm />
            </Layout>
          }
        />
        <Route
          path="/report-an-issue"
          element={
            <Layout>
              <ReportIssueForm />
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
