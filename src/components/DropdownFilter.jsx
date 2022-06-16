import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Transition from "../utils/Transition";
import { capitalize } from "../utils/capitalize";

function DropdownFilter({ setPage, align, setTaxFilter }) {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const [filterArray, setFilterArray] = useState([]);

  const taxFilters = [
    { name: "ES General 21%", field: "es_general_21" },
    { name: "ES Reducido 10%", field: "es_reduced_10" },
    { name: "ES Super reducido 4%", field: "es_super-reduced_4" },
    { name: "FR General 20%", field: "fr_general_20" },
    { name: "FR Reducido 5.5%", field: "fr_reduced_5.5" },
  ];

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Handle change Checkbox
  const handleChange = (e) => {
    e.target.checked
      ? setFilterArray([...filterArray, e.target.value])
      : setFilterArray(filterArray.filter((item) => item !== e.target.value));
  };

  // Handle Submit Apply button
  const handleSubmit = () => {
    setDropdownOpen(false);
    setTaxFilter(filterArray);
    setPage(1);
  };

  // Clear all selection
  const clearCheck = () => {
    setPage(1);
    setTaxFilter([]);
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = false));
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="btn bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}>
        {capitalize(t("tax"))}
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full min-w-56 bg-white border border-slate-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0">
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">
            {t("tax").toUpperCase()}
          </div>
          <ul className="mb-4">
            {taxFilters.map((item) => (
              <li key={item.field} className="py-1 px-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    value={item.field}
                    onChange={handleChange}
                  />
                  <span className="text-sm font-medium ml-2">{item.name}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="py-2 px-3 border-t border-slate-200 bg-slate-50">
            <ul className="flex items-center justify-between">
              <li>
                <button
                  onClick={clearCheck}
                  className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600">
                  {t("clear").toUpperCase()}
                </button>
              </li>
              <li>
                <button
                  className="btn-xs bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={handleSubmit}
                  onBlur={() => setDropdownOpen(false)}>
                  {t("apply").toUpperCase()}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownFilter;
