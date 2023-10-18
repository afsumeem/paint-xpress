import React from "react";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";

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
