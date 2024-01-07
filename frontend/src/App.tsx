import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Books from "./Components/Book";
import Reader from "./Components/Reader/Reader";
import Layout from "./Components/Layout";
import PageNotFound from "./Components/PageNotFound";
import Settings from "./Components/Settings";
import BookRequestForm from "./Components/BookRequestForm";
import ReportIssueForm from "./Components/ReportIssueForm";
import TypeThrough from "./Components/Reader/TypeThrough";

/**
 * The main App component where the routing of the application is defined.
 */
function App() {
  return (
    <BrowserRouter>
      {/* Wrapping the application within BrowserRouter to enable routing */}
      <Routes>
        {/* Routes container to define various paths and their corresponding components */}
        <Route
          path="/book/:bookSlug" // Route for individual book details
          element={
            <Layout>
              {/* Common layout used across the application */}
              <Books /> {/* Component to display book details */}
            </Layout>
          }
        />
        <Route
          path="/read/:bookSlug" // Route for reading a book
          element={
            <Layout>
              <Reader /> {/* Component to read a book */}
            </Layout>
          }
        />
        <Route
          path="/type/:bookSlug" // Route for typing through a book
          element={
            <Layout>
              <TypeThrough />
              {/* Component for interactive typing through a book */}
            </Layout>
          }
        />
        <Route
          path="/request-a-book" // Route for requesting a new book
          element={
            <Layout>
              <BookRequestForm /> {/* Component for book request form */}
            </Layout>
          }
        />
        <Route
          path="/report-an-issue" // Route for reporting an issue
          element={
            <Layout>
              <ReportIssueForm /> {/* Component for reporting issues */}
            </Layout>
          }
        />
        <Route
          path="/settings" // Route for application settings
          element={
            <Layout>
              <Settings /> {/* Component for settings */}
            </Layout>
          }
        />
        <Route
          path="/" // Default route, typically the home page
          element={
            <Layout>
              <Home /> {/* Home component */}
            </Layout>
          }
        />
        <Route
          path="/*" // Fallback route for unmatched paths
          element={
            <Layout>
              <PageNotFound />
              {/* Component to display when no route matches */}
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
