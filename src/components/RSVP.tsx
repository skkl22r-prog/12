import { useState } from "react";
import { Check, X, Send, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Reveal from "./Reveal";
import { useLang } from "@/i18n/LanguageContext";

const HOST_WHATSAPP = "966554129943";

type State =
  | { kind: "form" }
  | { kind: "loading" }
  | { kind: "attending"; name: string }
  | { kind: "declined"; name: string }
  | { kind: "error"; msg: string };

const RSVP = () => {
  const { t } = useLang();

  const [name, setName] = useState("");
  const [choice, setChoice] = useState<"attending" | "declined" | null>(null);
  const [state, setState] = useState<State>({ kind: "form" });

  const submit = async () => {
    if (!name.trim() || !choice) return;

    setState({ kind: "loading" });

    const deviceId = crypto.randomUUID();

    const { error } = await supabase.from("rsvps").insert({
      name: name.trim(),
      status: choice,
      device_id: deviceId,
    });

    if (error) {
      setState({ kind: "error", msg: "حدث خطأ، حاول مرة أخرى" });
      return;
    }

    if (choice === "attending") {
      setState({ kind: "attending", name: name.trim() });
      setTimeout(() => sendWhatsApp("attending", name.trim()), 3000);
    } else {
      setState({ kind: "declined", name: name.trim() });
      setTimeout(() => sendWhatsApp("declined", name.trim()), 4000);
    }
  };

  const sendWhatsApp = (status: "attending" | "declined", guestName: string) => {
    const text =
      status === "attending"
        ? `🌸 ${t("thanks_attending")}\n${guestName}\n`
        : `🌸 ${t("thanks_declined")}\n${guestName}\n`;

    const isMobile = /iPhone|Android/i.test(navigator.userAgent);

    const url = isMobile
      ? `whatsapp://send?phone=${HOST_WHATSAPP}&text=${encodeURIComponent(text)}`
      : `https://wa.me/${HOST_WHATSAPP}?text=${encodeURIComponent(text)}`;

    window.location.href = url;
  };

  // ===== ATTENDING =====
  if (state.kind === "attending") {
    return (
      <Reveal>
        <div
          className="mx-auto max-w-md rounded-2xl p-8 text-center backdrop-blur-md"
          style={{
background: "hsla(40, 50%, 95%, 0.6)"
            border: "2px solid hsl(340 55% 60%)",
            boxShadow: "0 0 40px hsl(340 55% 60% / 0.3)",
          }}
        >
          <div className="text-2xl font-bold mb-4" style={{ color: "hsl(340 45% 30%)" }}>
            {t("thanks_attending")}
          </div>

          <div className="text-base mb-6" style={{ color: "hsl(340 45% 30%)" }}>
            {state.name}
          </div>

          <p className="text-sm" style={{ color: "hsl(340 45% 30%)" }}>
            {t("redirect_wa")}
          </p>
        </div>
      </Reveal>
    );
  }

  // ===== DECLINED =====
  if (state.kind === "declined") {
    return (
      <Reveal>
        <div
          className="mx-auto max-w-md rounded-2xl p-8 text-center backdrop-blur-md"
          style={{
            background: "hsla(345, 60%, 97%, 0.6)",
border: "1.5px solid hsl(42 75% 55% / 0.5)"
          }}
        >
          <Heart className="mx-auto w-10 h-10 mb-3" style={{ color: "hsl(340 55% 60%)" }} />

          <p className="text-xl leading-loose" style={{ color: "hsl(340 45% 30%)" }}>
            {t("thanks_declined")}
            <br />
            {state.name}
          </p>

          <button
            onClick={() => sendWhatsApp("declined", state.name)}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
            style={{
              background: "hsl(340 55% 60%)",
              color: "#fff",
              boxShadow: "0 4px 14px hsl(340 55% 60% / 0.4)",
            }}
          >
            <Send className="w-4 h-4" />
            {t("send")}
          </button>
        </div>
      </Reveal>
    );
  }

  // ===== FORM =====
return (
  <Reveal>
    <div
      className="mx-auto max-w-md rounded-2xl p-8 backdrop-blur-md"
      style={{
        background: "hsla(345, 60%, 97%, 0.6)",
        border: "1.5px solid hsl(340 50% 75% / 0.5)",
      }}
    >
      <div className="text-center mb-4">
        <p style={{ color: "hsl(340 45% 30%)" }}>
          {t("rsvp_sub")}
        </p>
      </div>

        <label className="block text-sm mb-2" style={{ color: "hsl(30 35% 22%)" }}>
          {t("name_label")}
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("name_placeholder")}
          className="w-full px-4 py-3 rounded-xl text-right"
          style={{
            background: "hsla(40, 50%, 98%, 0.8)",
border: "1.5px solid hsl(42 60% 60% / 0.6)",
color: "hsl(30 35% 22%)",
          }}
        />

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={() => setChoice("attending")}
            className="py-3 rounded-xl text-sm flex items-center justify-center gap-2"
            style={{
              background:
  choice === "declined"
    ? "hsl(30 30% 35%)"
    : "hsla(40, 50%, 98%, 0.6)",
color:
  choice === "declined"
    ? "hsl(40 50% 95%)"
    : "hsl(30 25% 35%)",
border: "1.5px solid hsl(30 30% 50%)",
            }}
          >
            <Check className="w-4 h-4" />
            {t("confirm")}
          </button>

          <button
            onClick={() => setChoice("declined")}
            className="py-3 rounded-xl text-sm flex items-center justify-center gap-2"
            style={{
              background:
  choice === "attending"
    ? "linear-gradient(135deg, hsl(45 80% 65%), hsl(38 70% 45%))"
    : "hsla(40, 50%, 98%, 0.6)",
color:
  choice === "attending"
    ? "hsl(30 40% 18%)"
    : "hsl(38 65% 38%)",
border: "1.5px solid hsl(42 75% 55%)",
boxShadow:
  choice === "attending"
    ? "0 0 20px hsl(42 80% 60% / 0.5)"
    : "none",
            }}
          >
            <X className="w-4 h-4" />
            {t("decline")}
          </button>
        </div>

        <button
          onClick={submit}
          disabled={!name.trim() || !choice || state.kind === "loading"}
          className="w-full mt-5 py-3 rounded-xl text-base flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, hsl(45 80% 65%), hsl(38 70% 42%))",
color: "hsl(30 40% 18%)",
boxShadow: "0 4px 20px hsl(42 80% 50% / 0.45)",
            fontWeight: 700,
          }}
        >
          <Send className="w-4 h-4" />
          {state.kind === "loading" ? t("sending") : t("send")}
        </button>

        {state.kind === "error" && (
          <p className="text-sm text-center mt-3" style={{ color: "red" }}>
            {state.msg}
          </p>
        )}
      </div>
    </Reveal>
  );
};

export default RSVP;