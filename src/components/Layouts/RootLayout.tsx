import React from "react";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
