import React from "react";
import { useTranslation } from "react-i18next";
import { capitalize } from "../utils/capitalize";

const SearchForm = ({ setPage, handleQuery }) => {
  const { t } = useTranslation();
  const onTrigger = (event) => {
    setPage(1);
    handleQuery(event.target.s.value.toLowerCase());
    event.preventDefault();
  };

  return (
    <form className="relative" onSubmit={onTrigger}>
      <label htmlFor="action-search" className="sr-only">
        {capitalize(t("search"))}
      </label>
      <input
        id="action-search"
        className="form-input pl-9 focus:border-slate-300"
        type="text"
        placeholder={capitalize(t("search"))}
        name="s"
      />
      <button
        className="absolute inset-0 right-auto group"
        type="submit"
        aria-label="Search">
        <svg
          className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
          <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchForm;
