import React from "react";
import TableHeader from "./TableHeader";
import { useTranslation } from "react-i18next";
import { capitalize } from "../utils/capitalize";

function ProductsTable({ setSorting, products, pagination, setPage }) {
  const { t } = useTranslation();
  const columns = products[0] && Object.keys(products[0]);
  let totalProducts = pagination ? pagination.totalResults : 0;

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">
          {capitalize(t("products"))}{" "}
          <span className="text-slate-400 font-medium">{totalProducts}</span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <TableHeader
              onSorting={(field, order) => setSorting({ field, order })}
              setPage={setPage}
            />
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {products.map((row) => (
                <tr key={row.id}>
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductsTable;
