export function formatPersianDate(dateString) {
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"
  ];

  const date = new Date(dateString);

  let day = date.toLocaleDateString("fa-IR", { day: "numeric" });
  let monthIndex = date.toLocaleDateString("fa-IR", { month: "numeric" });

  const faToEn = (str) => str.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  day = faToEn(day);
  monthIndex = faToEn(monthIndex);

  monthIndex = parseInt(monthIndex, 10) - 1;

  return `${day} ${months[monthIndex]}`;
}
