import { useState } from "react";
import { Check, X, Send, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Reveal from "./Reveal";

const HOST_WHATSAPP = "966554129943";

type State =
  | { kind: "form" }
  | { kind: "loading" }
  | { kind: "attending"; name: string }
  | { kind: "declined"; name: string }
  | { kind: "error"; msg: string };

const RSVP = () => {
  const [name, setName] = useState("");
  const [choice, setChoice] = useState<"attending" | "declined" | null>(null);
  const [state, setState] = useState<State>({ kind: "form" });

  const PINK = "hsl(340 55% 60%)";
  const PINK_BORDER = "hsl(340 50% 75% / 0.5)";
  const BG = "hsla(345, 60%, 97%, 0.6)";
  const TEXT = "hsl(340 45% 30%)";

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
        ? `🌸 تأكيد حضور الحفل\nالاسم: ${guestName}\nالحالة: سأحضر بإذن الله`
        : `🌸 اعتذار عن الحضور\nالاسم: ${guestName}\nالحالة: لن أتمكن من الحضور`;

    const url = `https://wa.me/${HOST_WHATSAPP}?text=${encodeURIComponent(text)}`;
    window.location.href = url;
  };

  // ===== STATES =====

  if (state.kind === "attending") {
    return (
      <Reveal>
        <div
          className="mx-auto max-w-md rounded-2xl p-8 text-center backdrop-blur-md"
          style={{
            background: BG,
            border: `2px solid ${PINK}`,
            boxShadow: `0 0 40px ${PINK}33`,
          }}
        >
          <div className="text-2xl mb-4 font-bold" style={{ color: TEXT }}>
            نسعد بحضورك 🌸
          </div>
          <div className="text-base mb-6" style={{ color: TEXT }}>
            أهلاً وسهلاً، {state.name}
          </div>
          <p className="text-sm" style={{ color: TEXT }}>
            سيتم تحويلك إلى الواتساب خلال لحظات...
          </p>
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
            background: BG,
            border: `1.5px solid ${PINK_BORDER}`,
          }}
        >
          <Heart className="mx-auto w-10 h-10 mb-3" style={{ color: PINK, fill: PINK }} />
          <p className="text-xl leading-loose" style={{ color: TEXT }}>
            نقدّر اعتذارك يا {state.name} ❤️
            <br />
            ونراك في مناسبة أخرى
          </p>

          <button
            onClick={() => sendWhatsApp("declined", state.name)}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
            style={{
              background: PINK,
              color: "#fff",
              boxShadow: `0 4px 14px ${PINK}55`,
            }}
          >
            <Send className="w-4 h-4" />
            إرسال عبر واتساب
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
          background: BG,
          border: `1.5px solid ${PINK_BORDER}`,
        }}
      >
        <label className="block text-sm mb-2" style={{ color: TEXT }}>
          الاسم الكريم
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اكتب اسمك هنا"
          className="w-full px-4 py-3 rounded-xl text-right"
          style={{
            background: "hsla(345, 60%, 98%, 0.8)",
            border: `1.5px solid ${PINK_BORDER}`,
            color: TEXT,
          }}
        />

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={() => setChoice("attending")}
            className="py-3 rounded-xl text-sm flex items-center justify-center gap-2"
            style={{
              background:
                choice === "attending" ? PINK : BG,
              color: TEXT,
              border: `1.5px solid ${PINK_BORDER}`,
              boxShadow: choice === "attending" ? `0 0 20px ${PINK}55` : "none",
            }}
          >
            <Check className="w-4 h-4" />
            تأكيد الحضور
          </button>

          <button
            onClick={() => setChoice("declined")}
            className="py-3 rounded-xl text-sm flex items-center justify-center gap-2"
            style={{
              background:
                choice === "declined" ? PINK : BG,
              color: TEXT,
              border: `1.5px solid ${PINK_BORDER}`,
            }}
          >
            <X className="w-4 h-4" />
            الاعتذار
          </button>
        </div>

        <button
          onClick={submit}
          disabled={!name.trim() || !choice || state.kind === "loading"}
          className="w-full mt-5 py-3 rounded-xl text-base flex items-center justify-center gap-2"
          style={{
            background: PINK,
            color: "#fff",
            boxShadow: `0 4px 20px ${PINK}55`,
            fontWeight: 700,
          }}
        >
          <Send className="w-4 h-4" />
          {state.kind === "loading" ? "جارٍ الإرسال..." : "إرسال"}
        </button>

        {state.kind === "error" && (
          <p className="text-sm text-center mt-3" style={{ color: "hsl(0 70% 45%)" }}>
            {state.msg}
          </p>
        )}
      </div>
    </Reveal>
  );
};

export default RSVP;