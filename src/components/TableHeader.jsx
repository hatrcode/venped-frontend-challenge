import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useTranslation } from "react-i18next";

const TableHeader = ({ setPage, onSorting }) => {
  const { t } = useTranslation();
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const headers = [
    { name: "id", field: "id" },
    { name: "title", field: "title" },
    { name: "price", field: "price" },
    { name: "tax", field: "tax" },
    { name: "stock", field: "stock" },
  ];

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
    setPage(1);
  };

  return (
    <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
      <tr>
        {headers.map(({ name, field }) => (
          <th
            className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
            key={name}
            onClick={() => onSortingChange(field)}>
            <div className="flex items-center">
              <div className="font-semibold text-left">{t(name)}</div>
              {sortingOrder === "asc" ? (
                <ArrowDropDownIcon />
              ) : (
                <ArrowDropUpIcon />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
