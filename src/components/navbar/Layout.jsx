import React from "react";
import Footer from "./Footer";
import PrivateNavbar from "./PrivateNavbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
        {/* <PrivateNavbar /> */}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>

    
  );
};

export default Layout;

