// Layout Component
// This component acts as a layout wrapper for pages in the application.
// It includes a Navbar and a container for child components.

import React, { ReactNode } from "react";
import Navbar from "./Navbar";

// Props type definition.
type LayoutProps = {
  children: ReactNode; // The child components to be rendered within the layout.
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Navbar component included at the top of each page */}
      <Navbar />

      {/* Child components passed to the Layout */}
      {children}
    </>
  );
};

export default Layout;
