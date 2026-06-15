import { useEffect, useRef, useState } from "react";
import { Check, X, Send, Heart, Download } from "lucide-react";
import QRCode from "qrcode";
import Reveal from "./Reveal";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const HOST_WHATSAPP = "966554129943";
const REDIRECT_SECONDS = 10;

type State =
  | { kind: "form" }
  | { kind: "loading" }
  | { kind: "qr"; name: string; token: string; dataUrl: string }
  | { kind: "declined"; name: string };

// Per-device id so a returning user keeps the same row attribution
const getDeviceId = () => {
  let id = localStorage.getItem("device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("device_id", id);
  }
  return id;
};

const RSVP = () => {
  const { t, lang } = useLang();
  const [name, setName] = useState("");
  const [choice, setChoice] = useState<"attending" | "declined" | null>(null);
  const [state, setState] = useState<State>({ kind: "form" });
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);
  const redirectedRef = useRef(false);

  const buildWaUrl = (status: "attending" | "declined", guestName: string, token?: string) => {
    const text =
      status === "attending"
        ? lang === "ar"
          ? `🌸 تأكيد حضور حفل زفاف صبا سعد\nالاسم: ${guestName}\nالحالة: سأحضر بإذن الله${token ? `\nرمز الدخول: ${token}` : ""}`
          : `🌸 Wedding RSVP — Saba Saad\nName: ${guestName}\nStatus: Will attend, God willing${token ? `\nEntry code: ${token}` : ""}`
        : lang === "ar"
          ? `🌸 رد على دعوة حفل زفاف صبا سعد\nالاسم: ${guestName}\nالحالة: للأسف لن أتمكن من الحضور`
          : `🌸 Wedding RSVP — Saba Saad\nName: ${guestName}\nStatus: Sorry, unable to attend`;
    return `https://wa.me/${HOST_WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  const submit = async () => {
    if (!name.trim() || !choice) return;
    setState({ kind: "loading" });
    const trimmed = name.trim();
    const deviceId = getDeviceId();

    if (choice === "declined") {
      await supabase.from("rsvps").insert({
        name: trimmed,
        status: "declined",
        device_id: deviceId,
      });
      setState({ kind: "declined", name: trimmed });
      setTimeout(() => {
        window.location.href = buildWaUrl("declined", trimmed);
      }, 1500);
      return;
    }

    // attending → create unique QR token, persist, generate QR image
    const token = crypto.randomUUID();
    const { error } = await supabase.from("rsvps").insert({
      name: trimmed,
      status: "attending",
      device_id: deviceId,
      qr_token: token,
    });
    if (error) {
      console.error("rsvp insert error", error);
    }

    const scanUrl = `${window.location.origin}/scan/${token}`;
    const dataUrl = await QRCode.toDataURL(scanUrl, {
      width: 600,
      margin: 2,
      color: { dark: "#7a2747", light: "#ffffff" },
    });
    setState({ kind: "qr", name: trimmed, token, dataUrl });
    setCountdown(REDIRECT_SECONDS);
  };

  // countdown + auto-redirect once QR is shown
  useEffect(() => {
    if (state.kind !== "qr") return;
    redirectedRef.current = false;
    const iv = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(iv);
          if (!redirectedRef.current) {
            redirectedRef.current = true;
            window.location.href = buildWaUrl("attending", state.name, state.token);
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.kind]);

  const saveQr = () => {
    if (state.kind !== "qr") return;
    const a = document.createElement("a");
    a.href = state.dataUrl;
    a.download = `wedding-qr-${state.name.replace(/\s+/g, "-")}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (state.kind === "qr") {
    return (
      <Reveal>
        <div
          className="mx-auto max-w-md rounded-2xl p-6 sm:p-8 text-center backdrop-blur-md"
          style={{
            background: "hsla(345, 60%, 97%, 0.85)",
            border: "1.5px solid hsl(340 55% 70%)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <Heart
            className="mx-auto w-9 h-9 mb-2"
            style={{ color: "hsl(340 60% 55%)", fill: "hsl(340 60% 55%)" }}
          />
          <div
            className="font-tajawal text-lg sm:text-xl mb-1"
            style={{ color: "hsl(340 45% 30%)", fontWeight: 700 }}
          >
            {t("qr_title")}
          </div>
          <div className="font-tajawal text-sm mb-4" style={{ color: "hsl(340 25% 45%)" }}>
            {state.name}
          </div>

          <div
            className="mx-auto rounded-xl p-3 inline-block"
            style={{
              background: "white",
              border: "1.5px solid hsl(340 50% 75%)",
              boxShadow: "0 6px 22px hsl(340 50% 60% / 0.25)",
            }}
          >
            <img
              src={state.dataUrl}
              alt="QR"
              className="block w-[230px] h-[230px] sm:w-[260px] sm:h-[260px]"
            />
          </div>

          <p className="font-tajawal text-xs mt-3" style={{ color: "hsl(340 25% 45%)" }}>
            {t("qr_sub")}
          </p>

          <button
            onClick={saveQr}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-tajawal text-sm transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(340 65% 70%), hsl(340 55% 50%))",
              color: "white",
              boxShadow: "0 4px 14px hsl(340 55% 55% / 0.4)",
              fontWeight: 700,
            }}
          >
            <Download className="w-4 h-4" />
            {t("save_qr")}
          </button>

          <div className="font-tajawal text-xs mt-5" style={{ color: "hsl(340 35% 40%)" }}>
            {t("redirecting_in")}{" "}
            <span style={{ color: "hsl(340 60% 50%)", fontWeight: 700 }}>
              {countdown}
            </span>{" "}
            {t("seconds_short")}
          </div>
        </div>
      </Reveal>
    );
  }

  if (state.kind === "declined") {
    return (
      <Reveal>
        <div
          className="mx-auto max-w-md rounded-2xl p-8 text-center backdrop-blur-md"
          style={{
            background: "hsla(345, 60%, 97%, 0.75)",
            border: "1.5px solid hsl(340 55% 70%)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <Heart
            className="mx-auto w-10 h-10 mb-3"
            style={{ color: "hsl(340 60% 55%)", fill: "hsl(340 60% 55%)" }}
          />
          <div
            className="font-tajawal text-xl mb-2"
            style={{ color: "hsl(340 45% 30%)", fontWeight: 700 }}
          >
            {t("thanks_declined")}
          </div>
          <div className="font-tajawal text-base mb-3" style={{ color: "hsl(340 35% 35%)" }}>
            {state.name}
          </div>
          <p className="font-tajawal text-sm" style={{ color: "hsl(340 20% 45%)" }}>
            {t("redirect_wa")}
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <div
        className="mx-auto max-w-md rounded-2xl p-8 backdrop-blur-md"
        style={{
          background: "hsla(345, 60%, 97%, 0.7)",
          border: "1.5px solid hsl(340 50% 75% / 0.6)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <label
          className={`block font-tajawal text-sm mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}
          style={{ color: "hsl(340 40% 35%)" }}
        >
          {t("name_label")}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          placeholder={t("name_placeholder")}
          className="w-full px-4 py-3 rounded-xl font-tajawal outline-none transition-colors"
          style={{
            background: "hsla(345, 60%, 99%, 0.85)",
            border: "1.5px solid hsl(340 45% 78%)",
            color: "hsl(340 35% 25%)",
            textAlign: lang === "ar" ? "right" : "left",
          }}
          dir={lang === "ar" ? "rtl" : "ltr"}
        />

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={() => setChoice("attending")}
            className="py-3 rounded-xl font-tajawal text-sm transition-all flex items-center justify-center gap-2"
            style={{
              background:
                choice === "attending"
                  ? "linear-gradient(135deg, hsl(340 65% 75%), hsl(340 55% 55%))"
                  : "hsla(345, 60%, 99%, 0.6)",
              color: choice === "attending" ? "white" : "hsl(340 45% 40%)",
              border: "1.5px solid hsl(340 55% 65%)",
              boxShadow:
                choice === "attending" ? "0 0 18px hsl(340 60% 70% / 0.5)" : "none",
            }}
          >
            <Check className="w-4 h-4" />
            {t("confirm")}
          </button>
          <button
            onClick={() => setChoice("declined")}
            className="py-3 rounded-xl font-tajawal text-sm transition-all flex items-center justify-center gap-2"
            style={{
              background:
                choice === "declined"
                  ? "hsl(340 20% 45%)"
                  : "hsla(345, 60%, 99%, 0.6)",
              color: choice === "declined" ? "white" : "hsl(340 25% 40%)",
              border: "1.5px solid hsl(340 25% 55%)",
            }}
          >
            <X className="w-4 h-4" />
            {t("decline")}
          </button>
        </div>

        <button
          onClick={submit}
          disabled={!name.trim() || !choice || state.kind === "loading"}
          className="w-full mt-5 py-3 rounded-xl font-tajawal text-base transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, hsl(340 65% 70%), hsl(340 55% 50%))",
            color: "white",
            boxShadow: "0 4px 20px hsl(340 55% 55% / 0.4)",
            fontWeight: 700,
          }}
        >
          <Send className="w-4 h-4" />
          {state.kind === "loading" ? t("sending") : t("send")}
        </button>
      </div>
    </Reveal>
  );
};

export default RSVP;
