import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import SearchForm from "./SearchForm";
import DropdownFilter from "./DropdownFilter";
import ProductsTable from "./ProductsTable";
import ItemPagination from "./ItemPagination";

const ProductContainer = () => {
  const [taxFilter, setTaxFilter] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "id", order: "asc" });

  const handleQuery = (searchQuery) => {
    setQuery({ query: searchQuery });
  };

  let titleFilter = query ? query.query : "";

  let sortingOrder = sorting.order ? sorting.order : "";

  let sortingField = sorting.field ? sorting.field : "";

  const { products, pagination } = useFetch(
    taxFilter,
    titleFilter,
    sortingOrder,
    sortingField,
    page
  );

  let numOfPages = pagination ? pagination.totalPages : "";

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
            <DropdownFilter align="right" />
          </div>
        </div>

        {/* Table */}
        <ProductsTable
          sorting={sorting}
          setSorting={setSorting}
          pagination={pagination}
          products={products}
          setPage={setPage}
        />

        {/* Pagination */}
        <div className="mt-8">
          <ItemPagination />
        </div>
      </div>
    </main>
  );
};

export default ProductContainer;
