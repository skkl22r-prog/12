import { useLang } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full text-sm font-semibold tracking-wide backdrop-blur-md transition-all hover:scale-105"
style={{
  background: "hsla(345, 60%, 97%, 0.6)",
  border: "1.5px solid #7DD3FC",
  color: "#243040",
  boxShadow: "0 0 18px rgba(125, 211, 252, 0.6)",
  fontFamily: "'Tajawal', sans-serif",
}}
    >
      {lang === "ar" ? "EN | ع" : "AR | A"}
    </button>
  );
};

export default LanguageToggle;
