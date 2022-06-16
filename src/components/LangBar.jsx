import React from "react";
import i18next from "i18next";
import cookies from "js-cookie";
import { GB, ES } from "country-flag-icons/react/3x2";

const LangBar = () => {
  const languages = ["en", "es"];
  const currentLanguageCode = cookies.get("i18next") || "en";

  return (
    <ul className="flex gap-3">
      {languages.map((code) => (
        <li key={code}>
          <a
            href="#"
            onClick={() => {
              i18next.changeLanguage(code);
            }}>
            <span
              style={{
                opacity: currentLanguageCode === code ? 0.5 : 1,
              }}>
              {code === "en" ? (
                <GB title="Great Britian" className="w-6 h-6" />
              ) : (
                <ES title="Spain" className="w-6 h-6" />
              )}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default LangBar;
