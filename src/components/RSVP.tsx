import { useState } from "react";
import { Check, X, Send, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Reveal from "./Reveal";
import { useLang } from "@/i18n/LanguageContext";


type State =
  | { kind: "form" }
  | { kind: "loading" }
  | { kind: "attending"; name: string }
  | { kind: "declined"; name: string }
  | { kind: "error"; msg: string };

const RSVP = () => {
  const { t } = useLang();

  const [name, setName] = useState("");
const [message, setMessage] = useState("");
const [choice, setChoice] = useState<"attending" | "declined" | null>(null);
const [state, setState] = useState<State>(() => {
  const saved = localStorage.getItem("rsvp_state");
  return saved ? JSON.parse(saved) : { kind: "form" };
});

  // ✔️ ألوان وردية فقط (نفس مربع الأطفال)
 const BLUE = "#7DD3FC";
const CARD_BG = "hsla(345, 60%, 97%, 0.6)";
const TEXT = "#243040";
const NUMBER = "#888B97";

  const submit = async () => {
    if (!name.trim() || !choice) return;

    setState({ kind: "loading" });
await fetch(
  "https://docs.google.com/forms/d/e/1FAIpQLSdZTE9drL9mkMp1TxJFcujXKkm-tbgUTuKR9w0_CWSObNNepw/formResponse",
  {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      "entry.217146927": name.trim(),
      "entry.1422434369":
        choice === "attending"
          ? "سأحضر بإذن الله"
          : "الاعتذار عن الحضور",
      "entry.1920509368": message,
    }),
  }
);
const deviceId = Date.now().toString();

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
const newState = { kind: "attending", name: name.trim() };
setState(newState);
localStorage.setItem("rsvp_state", JSON.stringify(newState));
    } else {
const newState = { kind: "declined", name: name.trim() };
setState(newState);
localStorage.setItem("rsvp_state", JSON.stringify(newState));
    }
  };

  // ===== ATTENDING =====
  if (state.kind === "attending") {
  return (
    <Reveal>
      <div
className="mx-auto w-[92%] max-w-sm sm:max-w-md rounded-2xl p-4 sm:p-8 backdrop-blur-md"
        style={{
          background: CARD_BG,
border: "1.5px solid #7DD3FC",
boxShadow: "0 0 18px rgba(125,211,252,.6)",
        }}
      >
        <Heart
          className="mx-auto w-10 h-10 mb-3"
style={{ color: "#888B97", fill: "#888B97" }}
        />

        <div className="text-2xl font-bold mb-4" style={{ color: TEXT }}>
          {t("thanks_attending")}
        </div>

        <div className="text-base mb-6" style={{ color: TEXT }}>
          {state.name}
        </div>

    
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
    background: CARD_BG,
    border: "1.5px solid #7DD3FC",
    boxShadow: "0 0 18px rgba(125, 211, 252, 0.6)",
  }}
>
        <Heart
          className="mx-auto w-10 h-10 mb-3"
style={{ color: "#888B97", fill: "#888B97" }}
        />

        <p className="text-xl leading-loose mb-3" style={{ color: TEXT }}>
          {t("thanks_declined")}
        </p>

        <div className="text-base mb-6" style={{ color: TEXT }}>
          {state.name}
        </div>

    
      </div>
    </Reveal>
  );
}

  // ===== FORM =====
  return (
    <Reveal>
      <div
className="mx-auto max-w-md sm:max-w-md max-w-[92%] rounded-2xl p-5 sm:p-8 backdrop-blur-md"
        style={{
          background: CARD_BG,
border: "1.5px solid #7DD3FC",
boxShadow: "0 0 18px rgba(125, 211, 252, 0.6)",
        }}
      >
        <label className="block text-sm mb-2" style={{ color: TEXT }}>
          {t("name_label")}
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("name_placeholder")}
          className="w-full px-4 py-3 rounded-xl text-right"
          style={{
            background: "hsla(345, 60%, 98%, 0.8)",
border: "1.5px solid #7DD3FC",
            color: TEXT,
          }}
        />
<label className="block text-sm mt-5 mb-2" style={{ color: TEXT }}>
  رسالة إلى العروسين
</label>

<textarea
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="اكتب رسالتك هنا..."
  rows={1}
  className="w-full px-4 py-3 rounded-xl text-right resize-none"
  style={{
    background: "hsla(345, 60%, 98%, 0.8)",
    border: "1.5px solid #7DD3FC",
    color: TEXT,
  }}
/>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={() => setChoice("attending")}
            className="py-3 rounded-xl text-sm flex items-center justify-center gap-2"
            style={{
              background: choice === "attending" ? "#7DD3FC" : CARD_BG,
border: "1.5px solid #7DD3FC",
boxShadow:
  choice === "attending"
    ? "0 0 18px rgba(125,211,252,.6)"
    : "none",
            }}
          >
            <Check className="w-4 h-4" />
            {t("confirm")}
          </button>

          <button
            onClick={() => setChoice("declined")}
            className="py-3 rounded-xl text-sm flex items-center justify-center gap-2"
            style={{
              background: choice === "declined" ? "#7DD3FC" : CARD_BG,
border: "1.5px solid #7DD3FC",
boxShadow:
  choice === "declined"
    ? "0 0 18px rgba(125,211,252,.6)"
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
  background: "#243040",
  color: "#FFFFFF",
  boxShadow: "0 0 18px rgba(125,211,252,.6)",
  fontWeight: 700,
}}
        >
<Send className="w-4 h-4" color="#FFFFFF" />
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