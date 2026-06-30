import { useState, useEffect } from "react";
import { MapPin, Heart, Baby, Camera } from "lucide-react";
import Envelope from "@/components/Envelope";
import SprayParticles from "@/components/SprayParticles";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import RSVP from "@/components/RSVP";
import MusicToggle from "@/components/MusicToggle";
import LanguageToggle from "@/components/LanguageToggle";
import SwanScene from "@/components/SwanScene";
import { useLang } from "@/i18n/LanguageContext";
import bgFloral from "@/assets/bg-floral.jpeg";

const Index = () => {
  const [opened, setOpened] = useState(false);
  const [hideScroll, setHideScroll] = useState(false); // ✔️ إضافة فقط
  const { t, lang } = useLang();
const glow = "#7DD3FC";
  // ✔️ إضافة فقط (بدون لمس أي شيء)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHideScroll(true);
      } else {
        setHideScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
  className="relative min-h-screen overflow-x-hidden"
  dir={lang === "ar" ? "rtl" : "ltr"}
  style={{
    background: "transparent",
  }}
>
     <div
  aria-hidden
  className="pointer-events-none fixed inset-0 z-0"
  style={{
    backgroundImage: `url(${bgFloral})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 1,
    mixBlendMode: "normal",
  }}
/>

      <SprayParticles />
      <LanguageToggle />
      <MusicToggle active={opened} />
      {!opened && <Envelope onOpen={() => setOpened(true)} />}

      {opened && (
        <main className="relative z-10">
          <section className="w-full p-0 m-0">
            <SwanScene />
          </section>

          <section className="px-4 py-16">
            <Reveal>
              <h2 className="text-center font-tajawal text-3xl mb-10" style={{ color: "#243040" }}>
                {t("countdown_title")}
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <Countdown />
            </Reveal>
          </section>

          <section className="px-4 py-16">
            <Reveal>
              <h2 className="text-center font-tajawal text-3xl mb-8" style={{ color: "#243040" }}>
                {t("venue_title")}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="text-center mb-6">
                <MapPin className="mx-auto w-10 h-10 mb-3" style={{ color: "#243040" }}/>
                <div className="font-tajawal text-2xl" style={{ color: "#243040" }}>
                  {t("venue_name")}
                </div>
                <div className="font-tajawal text-lg mt-1" style={{ color: "#243040" }}>
                  {t("venue_city")}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div
                className="max-w-2xl mx-auto rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "var(--shadow-soft)",
border: "1.5px solid #7DD3FC",
boxShadow: "0 0 18px rgba(125, 211, 252, 0.6)",
borderRadius: "12px",
                }}
              >
                <iframe
                  title="Venue"
src="https://www.google.com/maps?q=قاعة+ليلة+العمر+للاحتفالات+تبوك&output=embed"
                  width="100%"
                  height="320"
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </div>
            </Reveal>
          </section>
{false && (
          <section className="px-4 py-16">
            <Reveal>
              <h2 className="text-center font-tajawal text-3xl mb-6" style={{ color: "#243040" }}>
                {t("program_title")}
              </h2>
            </Reveal>
            <Timeline />
          </section>
)}
<section className="px-4 py-16">
            <Reveal>
              <h2 className="text-center font-tajawal text-3xl mb-10" style={{ color: "#243040" }}>
                {t("details_title")}
              </h2>
            </Reveal>

            <div className="relative max-w-xl mx-auto">
              <div
                className={`absolute top-6 bottom-6 ${lang === "ar" ? "right-6" : "left-6"} w-px`}
                style={{ border: "1.5px solid #7DD3FC",
boxShadow: "0 0 20px rgba(125, 211, 252, 0.6)", }}
              />

              <div className="space-y-6">
                {[
                  { icon: Baby, text: t("no_kids") },
                  { icon: Camera, text: t("no_cameras") },
                ].map((d, i) => (
                  <Reveal key={i} delay={i * 120}>
                   <div className={`relative ${lang === "ar" ? "pr-16" : "pl-16"}`}>
  
  {/* الدائرة الكبيرة */}
  <div
    className={`absolute ${lang === "ar" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10`}
    style={{
background: "hsla(345, 60%, 97%, 0.6)", // نفس المستطيل
      border: "2px solid #7DD3FC",
      boxShadow: "0 0 12px #7DD3FC",
    }}
  >
    {/* الدائرة الصغيرة */}
    <span
      className="w-2 h-2 rounded-full"
      style={{ background: "#243040" }}
    />
  </div>

  {/* المستطيل */}
  <div
    className="rounded-xl px-6 py-5 backdrop-blur-md flex items-center justify-between gap-4"
    style={{
background: "hsla(345, 60%, 97%, 0.6)",
      border: "1.5px solid #7DD3FC",
      boxShadow: "0 0 18px rgba(125, 211, 252, 0.6)",
    }}
  >
    <span
      className={`font-tajawal text-lg flex-1 ${
        lang === "ar" ? "text-right" : "text-left"
      }`}
      style={{ color: "#243040" }}
    >
      {d.text}
    </span>

    <d.icon
      className="w-7 h-7 shrink-0"
      style={{ color: "#243040" }}
    />
  </div>

</div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
          <RSVP />

          {/* ✔️ السهمين (إضافة فقط) */}
          <div className={`scroll-indicator ${hideScroll ? "hide" : ""}`}>
  <div className="scroll-text">اسحب للأسفل</div>
  <span className="arrow">⌄</span>
  <span className="arrow">⌄</span>
</div>

          <footer className="px-4 py-12 text-center">
  <Reveal>
    <div
      className="flex items-center justify-center gap-2"
      style={{ color: "#243040" }}
    >
      <Heart
        className="w-4 h-4 fill-current"
        style={{ color: "#243040" }}
      />

      <span className="font-tajawal text-sm" style={{ color: "#243040" }}>
        {t("made_by")}{" "}
        <a
          href="https://www.tiktok.com/@shim2t?_r=1&_t=ZS-95w0d8f7vnk"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
          style={{ color: "#243040" }}
        >
          {t("store")}
        </a>
      </span>
    </div>
  </Reveal>
</footer>
        </main>
      )}
    </div>
  );
};

export default Index;
