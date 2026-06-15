import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

const TARGET = new Date("2026-07-04T19:30:00+03:00").getTime();

const Countdown = () => {
  const { t } = useLang();
  const [tm, setTm] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET - Date.now());
      setTm({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { v: tm.d, l: t("days") },
    { v: tm.h, l: t("hours") },
    { v: tm.m, l: t("minutes") },
    { v: tm.s, l: t("seconds") },
  ];

  return (
    <div dir="ltr" className="flex justify-center gap-3 sm:gap-6">
      {items.map((it) => (
        <div
          key={it.l}
          className="flex flex-col items-center justify-center rounded-xl px-4 sm:px-6 py-4 min-w-[70px] sm:min-w-[90px] backdrop-blur-md"
          style={{
            background: "hsla(345, 60%, 97%, 0.6)",
            border: "1px solid hsl(340 45% 75% / 0.5)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div className="font-display text-3xl sm:text-4xl font-light tabular-nums" style={{ color: "hsl(340 45% 35%)" }}>
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-xs uppercase tracking-widest mt-1 font-tajawal" style={{ color: "hsl(340 25% 45%)" }}>
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
