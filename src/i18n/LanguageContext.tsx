import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, string>;

const ar: Dict = {
  tap_open: "اضغط لفتح الدعوة",
  invite_to: "إلى كل غــــــــــالي ومحـــــــــب",
  invite_join: "يسعدنا ان تكونوا جزء من فرحتنا",
  invite_day: "يــــَوم تعانق الفرحة قلـــــوبنا",
  invite_with_love: "بكـل الحـب والـود تتـــشرف",
word1: "السيدة ",
word2: "السيدة ",
mother_name1: "ام خلف",
mother_name2: "ام سعيد ",
  invite_attend: "بدعوتكم لحضور حفل زفاف ",
invite_before_bride: "أبنها",
invite_before_bride_2: "أبنتها",
  bride_name: "نايف",
groom_name: "رغـد",
  invite_god_willing: "وذلك بمشيئة الله تعالى يوم الخميس",
  date_line: "2026 . 07 . 30 | 1448 . 02 . 16",
  countdown_title: "العدّ التنازلي",
  days: "أيام",
  hours: "ساعات",
  minutes: "دقائق",
  seconds: "ثواني",
  venue_title: "موقع حفلنا",
  venue_name: " قاعــة ليله العمر",
  venue_city: "تبوك",
  program_title: "برنامج الحفل",
  program_reception: "الاستقبال",
  program_zaffa: "الـزفـــــــــــة",
  program_dinner: "العشـــــاء",
  details_title: "تفاصيل الحفل",
  no_kids: "يمنع اصطحاب الأطفال منعاً للاحراج يوجد حارسة على الباب",
  no_cameras: "يمنع دخول جوالات الكاميرا",
  rsvp_title: "أكّد حضورك",
  rsvp_sub: "نتشرف بحضوركم",
  name_label: "الاسم الكريم",
  name_placeholder: "اكتب اسمك هنا",
  confirm: "تأكيد الحضور",
  decline: "الاعتذار",
  send: "إرسال",
  sending: "جارٍ الإرسال...",
  thanks_attending: "شكراً لتأكيد حضورك",
  thanks_declined: "نقدّر اعتذارك",
  redirect_wa: "سيتم تحويلك إلى الواتساب لإرسال الرد...",
  made_by: "صُنع بحب بواسطة",
  store: "متجر غيمة",
  date_full: "الجمعة 25 سبتمبر 2026",
  cal_day: "Friday",
  cal_month: "September",
  cal_year: "2026",
  qr_title: "باركود الدخول الخاص بك",
  qr_sub: "يرجى تقديم هذا الباركود عند البوابة",
  save_qr: "حفظ الباركود",
  redirecting_in: "سيتم تحويلك إلى الواتساب خلال",
  seconds_short: "ث",
};

const en: Dict = {
  tap_open: "Tap to open the invitation",
  invite_to: "To Our Dearest Loved Ones",
  invite_join: "It would be our joy to have you share in our happiness",
  invite_day: "on the day joy embraces our hearts",
  invite_with_love: "With all love and affection",
word1: "Mrs.",
word2: "Mrs.",
mother_name1: " Umm Khalaf",
mother_name2: "Umm Saeed",
  invite_attend: "is honored to invite you to the wedding of her princess",
  bride_name: "Naif",
groom_name: "Raghad",
  invite_god_willing: "God willing, on Thursday",
  date_line: "30 . 07 . 2026   |  16 . 02 . 1448 ",
  countdown_title: "Countdown",
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
  venue_title: "Our Venue",
  venue_name: " Laylat Al Omr Hall",
  venue_city: "Tabuk",
  program_title: "Event Program",
  program_reception: "Reception",
  program_zaffa: "Zaffa",
  program_dinner: "Dinner",
  details_title: "Event Details",
  no_kids: "No children, please",
  no_cameras: "No camera phones permitted",
  rsvp_title: "Confirm Your Attendance",
  rsvp_sub: "We are honored by your presence",
  name_label: "Full Name",
  name_placeholder: "Type your name here",
  confirm: "Will Attend",
  decline: "Decline",
  send: "Send",
  sending: "Sending...",
  thanks_attending: "Thank you for confirming",
  thanks_declined: "We appreciate your reply",
  redirect_wa: "Redirecting you to WhatsApp to send the reply...",
  made_by: "Crafted with love by",
  store: "Ghaimah Store",
  date_full: "Thursday, July 22, 2026",
  cal_day: "Thursday",
  cal_month: "July",
  cal_year: "2026",
  qr_title: "Your Entry QR Code",
  qr_sub: "Please present this QR at the entrance",
  save_qr: "Save QR Code",
  redirecting_in: "Redirecting to WhatsApp in",
  seconds_short: "s",
};

const dicts = { ar, en };

interface LangCtx {
  lang: Lang;
  t: (k: keyof typeof ar) => string;
  toggle: () => void;
  dir: "rtl" | "ltr";
}

const Ctx = createContext<LangCtx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    return (saved === "en" || saved === "ar") ? saved : "ar";
  });
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = (k: keyof typeof ar) => dicts[lang][k] ?? k;
  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  return <Ctx.Provider value={{ lang, t, toggle, dir }}>{children}</Ctx.Provider>;
};

export const useLang = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be inside LanguageProvider");
  return c;
};
