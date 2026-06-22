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

      <label
        className="block text-sm mb-2"
        style={{ color: "hsl(340 45% 30%)" }}
      >
        {t("name_label")}
      </label>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t("name_placeholder")}
        className="w-full px-4 py-3 rounded-xl text-right"
        style={{
          background: "hsla(345, 60%, 98%, 0.8)",
          border: "1.5px solid hsl(340 50% 75% / 0.5)",
          color: "hsl(340 45% 30%)",
        }}
      />

      <div className="grid grid-cols-2 gap-3 mt-5">
        <button
          onClick={() => setChoice("attending")}
          className="py-3 rounded-xl text-sm flex items-center justify-center gap-2"
          style={{
            background:
              choice === "attending"
                ? "hsl(340 55% 60%)"
                : "hsla(345, 60%, 98%, 0.6)",

            color:
              choice === "attending"
                ? "#fff"
                : "hsl(340 45% 30%)",

            border: "1.5px solid hsl(340 50% 75% / 0.5)",

            boxShadow:
              choice === "attending"
                ? "0 0 20px hsl(340 55% 60% / 0.35)"
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
            background:
              choice === "declined"
                ? "hsl(340 55% 60%)"
                : "hsla(345, 60%, 98%, 0.6)",

            color:
              choice === "declined"
                ? "#fff"
                : "hsl(340 45% 30%)",

            border: "1.5px solid hsl(340 50% 75% / 0.5)",

            boxShadow:
              choice === "declined"
                ? "0 0 20px hsl(340 55% 60% / 0.35)"
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
          background: "hsl(340 55% 60%)",
          color: "#fff",
          boxShadow: "0 4px 20px hsl(340 55% 60% / 0.4)",
          fontWeight: 700,
        }}
      >
        <Send className="w-4 h-4" />
        {state.kind === "loading" ? t("sending") : t("send")}
      </button>

      {state.kind === "error" && (
        <p
          className="text-sm text-center mt-3"
          style={{ color: "red" }}
        >
          {state.msg}
        </p>
      )}
    </div>
  </Reveal>
);