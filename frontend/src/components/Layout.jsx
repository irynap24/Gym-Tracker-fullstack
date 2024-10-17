// Layout.jsx
import React from "react";
import Navbar from "./Navbar"; // Adjust the import path if necessary

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main style={{ marginTop: "60px" }}> {children}</main>
    </div>
  );
};

export default Layout;
