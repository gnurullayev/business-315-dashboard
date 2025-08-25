import { useState } from "react";
import "./styles.scss";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { dispatch } from "@/store";

const LanguageSwitcher = () => {
  const [lang, setLang] = useState<"uz" | "ru">("uz");
  const { i18n } = useTranslation();

  const handleChange = (language: "uz" | "ru") => {
    setLang(language);
    i18n.changeLanguage(language);
    dispatch.language.langChange(language);
  };
  return (
    <div className="lang_switcher">
      <Button
        className={`lang-btn lang_uz ${lang === "uz" ? "active" : ""}`}
        onClick={() => handleChange("uz")}
      >
        O'zb
      </Button>
      <Button
        className={`lang-btn lang_ru ${lang === "ru" ? "active" : ""}`}
        onClick={() => handleChange("ru")}
      >
        Рус
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
