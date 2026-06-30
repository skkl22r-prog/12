import Reveal from "./Reveal";
import { useLang } from "@/i18n/LanguageContext";

const Timeline = () => {
  const { t } = useLang();
  const events = [
    { time: "9:00 PM", label: t("program_reception") },
    { time: "2:00 AM", label: t("program_zaffa") },
    { time: "2:30 AM", label: t("program_dinner") },
  ];

  return (
    <div className="relative max-w-2xl mx-auto py-8">
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
        style={{ background: "hsl(340 35% 70% / 0.5)" }}
      />
      <div className="space-y-16">
        {events.map((e, i) => (
          <Reveal key={i} delay={i * 150}>
            <div className="relative flex items-center justify-center">
              <div
                className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10"
                style={{
                  background: "hsl(345 70% 96%)",
                  border: "2px solid hsl(340 45% 55%)",
                  boxShadow: "0 0 0 6px hsl(345 70% 96% / 0.5)",
                }}
              />
              <div className="grid grid-cols-2 w-full gap-8">
                <div
className="text-right pr-10 font-display text-2xl flex justify-start pl-8"
                  dir="ltr"
                  style={{ color: "hsl(340 45% 35%)", textAlign: "right" }}
                >
                  {e.time}
                </div>
<div
  className="text-right pr-10 font-tajawal text-2xl w-full"
  style={{ color: "hsl(340 40% 30%)" }}
>
                  {e.label}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
