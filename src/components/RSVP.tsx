import { useState } from "react";

// Google Form action
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSeCCc76FLMiqg_BMz4jLmcJ8RWBs0pYdOlhx0Rba1ZIbKxctQ/formResponse";

const FIELD_NAME = "entry.2121080640";
const FIELD_ATTEND = "entry.1078161612";
const FIELD_MESSAGE = "entry.2105314445";

const Rsvp = () => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append(FIELD_NAME, name);
    formData.append(
      FIELD_ATTEND,
      attendance === "yes" ? "تأكيد الحضور" : "الاعتذار عن الحضور"
    );
    formData.append(FIELD_MESSAGE, message);

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      alert("تم تسجيل الرد بنجاح");
      setName("");
      setAttendance("");
      setMessage("");
    } catch {
      alert("صار خطأ بالإرسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl p-5"
        style={{
          background: "#ffffff",
          border: "1.5px solid #B36E71",
          boxShadow: "0 8px 25px rgba(0,0,0,0.10)",
        }}
      >

        {/* الاسم */}
        <div>
  <label
    className="block mb-1 text-sm"
    style={{ color: "#B36E71" }}
  >
    الاسم الكريم
  </label>

  <input
    type="text"
    placeholder="اكتب اسمك الكريم..."
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full rounded-xl px-4 py-3 text-sm"
    style={{
      background: "#f5f5f5",
      border: "1px solid #B36E71",
      color: "#B36E71",
    }}
  />
</div>

        {/* أزرار الحضور */}
        <div className="grid grid-cols-2 gap-2">

          <button
            type="button"
            onClick={() => setAttendance("yes")}
            className="rounded-xl px-3 py-3 text-sm border"
            style={{
              background:
                attendance === "yes" ? "#B36E71" : "#f5f5f5",
              border: "1px solid #B36E71",
              color: attendance === "yes" ? "#fff" : "#B36E71",
            }}
          >
            تأكيد الحضور
          </button>

          <button
            type="button"
            onClick={() => setAttendance("no")}
            className="rounded-xl px-3 py-3 text-sm border"
            style={{
              background:
                attendance === "no" ? "#B36E71" : "#f5f5f5",
              border: "1px solid #B36E71",
              color: attendance === "no" ? "#fff" : "#B36E71",
            }}
          >
            الاعتذار عن الحضور
          </button>

        </div>

        {/* الرسالة */}
        <div>
  <label
    className="block mb-1 text-sm"
    style={{ color: "#B36E71" }}
  >
    رسالة إلى العروسين (اختياري)
  </label>

  <textarea
    placeholder="اكتب رسالتك..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="w-full rounded-xl px-4 py-3 text-sm resize-none"
    rows={3}
    style={{
      background: "#f5f5f5",
      border: "1px solid #B36E71",
      color: "#B36E71",
    }}
  />
</div>

        {/* زر الإرسال */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full px-5 py-3 text-sm font-medium"
          style={{
            background: "#B36E71",
            color: "#fff",
          }}
        >
          {loading ? "جاري الإرسال..." : "تأكيد الإرسال"}
        </button>

      </form>
    </div>
  );
};

export default Rsvp;