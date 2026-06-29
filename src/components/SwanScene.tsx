import { useLang } from "@/i18n/LanguageContext";

const SwanScene = () => {
  const { t, lang } = useLang();

  return (
    <section className="relative w-full">
      <div
        className="relative w-full mx-auto overflow-hidden"
        style={{ maxWidth: 480, aspectRatio: "9 / 16" }}
      >
        <video
          src="/sarah25.mov"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover select-none"
        />

        <div
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="absolute inset-0 flex items-center justify-center px-5 py-6"
        >
          <div
            className="flex flex-col items-center text-center px-5 py-6 rounded-2xl w-[98%] sm:w-[92%] gap-4"
            style={{
              background:
                "radial-gradient(ellipse at center, hsla(0,0%,0%,0.18) 0%, hsla(0,0%,0%,0.08) 200%, hsla(0,0%,0%,0) 100%)",
              backdropFilter: "blur(1.5px)",
              WebkitBackdropFilter: "blur(1.5px)",
              color: "#FFFFFF",
              textShadow:
                "0 1px 2px hsla(0,0%,0%,0.6), 0 0 10px hsla(0,0%,100%,0.35), 0 0 22px hsla(0,0%,100%,0.2)",
            }}
          >
            <div className="font-tajawal text-lg sm:text-xl">{t("invite_to")}</div>
            <div className="font-tajawal text-lg sm:text-xl">{t("invite_join")}</div>
            <div className="font-tajawal text-lg sm:text-xl">{t("invite_day")}</div>

            <div className="font-tajawal text-lg sm:text-xl mt-4">
              {t("invite_with_love")}
            </div>

<div className="hidden flex items-center justify-center gap-20 font-tajawal text-lg sm:text-xl mt-1">
  <span>{t("word1")}</span>
  <span>{t("word2")}</span>
</div>

          <div className="font-sarahhh1 text-4xl sm:text-5xl my-1 whitespace-nowrap flex justify-center items-center gap-8">
  <span>{t("mother_name1")}</span>
  <span>و</span>
  <span>{t("mother_name2")}</span>
</div>
            <div className="font-tajawal text-lg sm:text-xl mt-3">
              {t("invite_attend")}
            </div>
<div className="hidden w-full flex justify-center gap-16 font-tajawal text-lg sm:text-xl my-2">
  <span>{t("invite_before_bride")}</span>
  <span>{t("invite_before_bride_2")}</span>
</div>
            <div
  className={`${lang === "ar" ? "font-nasta" : "font-display italic"} text-5xl sm:text-6xl my-4`}
>
  {t("bride_name")}
  <span
    style={{
      fontSize: "0.35em",
      margin: "0 8px",
      verticalAlign: "middle",
    }}
  >
    ❤︎
  </span>
 {t("groom_name")}
</div>

<div className="flex flex-col items-center mt-10">
  <div className="font-tajawal text-lg sm:text-xl mb-1">
    {t("invite_god_willing")}
  </div>

  <div className="font-tajawal text-lg sm:text-xl inline-flex items-center gap-1.5" dir="ltr">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
    <span>{t("date_line")}</span>
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwanScene;
