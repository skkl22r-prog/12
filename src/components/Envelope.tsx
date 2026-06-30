import { useState } from "react";
import swans from "@/assets/swans.jpg";
import bowSeal from "@/assets/bow-seal.png";
import { useLang } from "@/i18n/LanguageContext";

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [opening, setOpening] = useState(false);
  const { t } = useLang();

  const trigger = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 2100);
  };

  return (
    <div
      className="fixed inset-0 z-40 cursor-pointer overflow-hidden"
      style={{ background: "#243040", perspective: "2000px" }}
      onClick={trigger}
    >
      <div className="absolute inset-0 flex items-center justify-center">
   
      </div>

      <div className="absolute inset-0 flex">
        {/* Right vellum panel */}
        <div
          className="absolute top-0 right-0 h-full w-1/2 overflow-hidden"
          style={{
            transition: "transform 2s cubic-bezier(0.65, 0, 0.35, 1) 0.08s",
            transform: opening ? "translateX(110%)" : "translateX(0)",
            background:
  "linear-gradient(135deg, #888B97, hsla(200, 100%, 92%, 0.45))",
            backdropFilter: "blur(14px) saturate(140%)",
            WebkitBackdropFilter: "blur(14px) saturate(140%)",
            borderLeft: "1px solid hsla(0,0%,100%,0.45)",
            boxShadow: opening
              ? "-30px 0 60px hsla(0,0%,0%,0.45)"
              : "inset 6px 0 24px hsla(340,30%,40%,0.18), inset 0 0 80px hsla(0,0%,100%,0.25)",
          }}
        >
          {/* Pearl + gold romantic ornament overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: [
                "radial-gradient(circle at 18% 22%, hsla(0,0%,100%,0.85) 0 1.2px, transparent 1.6px)",
                "radial-gradient(circle at 72% 14%, hsla(0,0%,100%,0.7) 0 1px, transparent 1.4px)",
                "radial-gradient(circle at 35% 65%, hsla(0,0%,100%,0.75) 0 1.1px, transparent 1.5px)",
                "radial-gradient(circle at 82% 78%, hsla(42,80%,82%,0.55) 0 1px, transparent 1.4px)",
                "radial-gradient(circle at 12% 88%, hsla(42,80%,82%,0.5) 0 1px, transparent 1.4px)",
                "repeating-linear-gradient(45deg, hsla(0,0%,100%,0.05) 0 2px, transparent 2px 14px)",
              ].join(","),
              backgroundSize: "auto, auto, auto, auto, auto, 28px 28px",
              mixBlendMode: "screen",
            }}
          />
          {/* Soft floral filigree corner */}
          <svg
            className="absolute top-4 right-4 w-28 h-28 opacity-70"
            viewBox="0 0 100 100"
            fill="none"
            stroke="hsla(42, 70%, 70%, 0.75)"
            strokeWidth="0.6"
          >
            <path d="M90,10 Q70,20 60,40 T30,70" />
            <circle cx="60" cy="40" r="3" fill="hsla(0,0%,100%,0.85)" />
            <circle cx="45" cy="55" r="2" fill="hsla(0,0%,100%,0.7)" />
            <circle cx="35" cy="68" r="1.6" fill="hsla(42,80%,82%,0.8)" />
            <path d="M85,25 Q80,32 72,34" />
            <path d="M78,42 Q72,48 66,48" />
          </svg>
        </div>

        {/* Left vellum panel */}
        <div
          className="absolute top-0 left-0 h-full w-1/2 overflow-hidden"
          style={{
            transition: "transform 2s cubic-bezier(0.65, 0, 0.35, 1)",
            transform: opening ? "translateX(-110%)" : "translateX(0)",
         background:
  "linear-gradient(225deg, #888B97, hsla(200, 100%, 92%, 0.45))",
            backdropFilter: "blur(14px) saturate(140%)",
            WebkitBackdropFilter: "blur(14px) saturate(140%)",
            borderRight: "1px solid hsla(0,0%,100%,0.45)",
            boxShadow: opening
              ? "30px 0 60px hsla(0,0%,0%,0.45)"
              : "inset -6px 0 24px hsla(340,30%,40%,0.18), inset 0 0 80px hsla(0,0%,100%,0.25)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: [
                "radial-gradient(circle at 82% 22%, hsla(0,0%,100%,0.85) 0 1.2px, transparent 1.6px)",
                "radial-gradient(circle at 28% 14%, hsla(0,0%,100%,0.7) 0 1px, transparent 1.4px)",
                "radial-gradient(circle at 65% 65%, hsla(0,0%,100%,0.75) 0 1.1px, transparent 1.5px)",
                "radial-gradient(circle at 18% 78%, hsla(42,80%,82%,0.55) 0 1px, transparent 1.4px)",
                "radial-gradient(circle at 88% 88%, hsla(42,80%,82%,0.5) 0 1px, transparent 1.4px)",
                "repeating-linear-gradient(-45deg, hsla(0,0%,100%,0.05) 0 2px, transparent 2px 14px)",
              ].join(","),
              backgroundSize: "auto, auto, auto, auto, auto, 28px 28px",
              mixBlendMode: "screen",
            }}
          />
          <svg
            className="absolute top-4 left-4 w-28 h-28 opacity-70"
            viewBox="0 0 100 100"
            fill="none"
            stroke="hsla(42, 70%, 70%, 0.75)"
            strokeWidth="0.6"
          >
            <path d="M10,10 Q30,20 40,40 T70,70" />
            <circle cx="40" cy="40" r="3" fill="hsla(0,0%,100%,0.85)" />
            <circle cx="55" cy="55" r="2" fill="hsla(0,0%,100%,0.7)" />
            <circle cx="65" cy="68" r="1.6" fill="hsla(42,80%,82%,0.8)" />
            <path d="M15,25 Q20,32 28,34" />
            <path d="M22,42 Q28,48 34,48" />
          </svg>
        </div>

        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px pointer-events-none"
          style={{
  background: "hsla(200, 100%, 88%, 0.8)",
  opacity: opening ? 0 : 1,
  transition: "opacity 0.6s ease-out",
}}
        />

        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center"
          style={{
            opacity: opening ? 0 : 1,
            transition: "opacity 0.5s ease-out",
          }}
        >
          <div className="animate-float-slow">
            <img
              src={bowSeal}
              alt="ribbon seal"
              className="w-56 h-56 sm:w-72 sm:h-72 object-contain"
              style={{
                filter:
                  "drop-shadow(0 14px 40px hsla(340, 40%, 30%, 0.55)) drop-shadow(0 0 25px hsla(340, 70%, 80%, 0.45))",
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm font-tajawal animate-pulse z-10"
        style={{ color: "hsla(200, 100%, 96%, 0.95)" }}
      >
        {t("tap_open")}
      </div>
    </div>
  );
};

export default Envelope;
