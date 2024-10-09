import React from "react";
import Navbar from "./Navbar"; //

function Layout({ children }) {
  return (
    <div>
      <Navbar /> {/* ensure the Navbar is present on every page */}
      <div>{children}</div> {/* render the specific page content */}
    </div>
  );
}

export default Layout;
