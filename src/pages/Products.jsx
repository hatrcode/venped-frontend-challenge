import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductContainer from "../components/ProductContainer";

function Products() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <ProductContainer />
      </div>
    </div>
  );
}

export default Products;
