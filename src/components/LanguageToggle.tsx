import { useLang } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full text-sm font-semibold tracking-wide backdrop-blur-md transition-all hover:scale-105"
      style={{
        background: "hsla(0, 0%, 100%, 0.75)",
        border: "1.5px solid hsl(340 50% 75%)",
        color: "hsl(340 40% 35%)",
        boxShadow: "0 4px 14px hsl(340 40% 60% / 0.25)",
        fontFamily: "'Tajawal', sans-serif",
      }}
    >
      {lang === "ar" ? "EN | ع" : "AR | A"}
    </button>
  );
};

export default LanguageToggle;
