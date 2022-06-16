import React, { useState } from "react";
import SearchForm from "./SearchForm";
import FilterButton from "./DropdownFilter";
import ProductsTable from "./ProductsTable";
import PaginationNumeric from "./PaginationNumeric";

const ProductContainer = () => {
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-5">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
              Catálogo
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Search form */}
            <SearchForm placeholder="Search by Product ID…" />
            {/* Filter button */}
            <FilterButton align="right" />
          </div>
        </div>

        {/* Table */}
        <ProductsTable />

        {/* Pagination */}
        <div className="mt-8">
          <PaginationNumeric />
        </div>
      </div>
    </main>
  );
};

export default ProductContainer;
