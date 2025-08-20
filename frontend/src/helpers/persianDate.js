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


export function persianToGregorian(persianDateStr) {
  let parts = persianDateStr.replaceAll("-", "/").split("/");
  let jy = parseInt(parts[0]);
  let jm = parseInt(parts[1]);
  let jd = parseInt(parts[2]);

  let gy;
  if (jy > 979) {
    gy = 1600;
    jy -= 979;
  } else {
    gy = 621;
  }

  let days =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);

  gy += 400 * Math.floor(days / 146097);
  days %= 146097;

  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }

  gy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let gd = days + 1;
  let sal_a = [
    0,
    31,
    ((gy % 4 == 0 && gy % 100 != 0) || gy % 400 == 0) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let gm;
  for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) {
    gd -= sal_a[gm];
  }

  return new Date(`${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`);
}

export function getMonthDay(dateStr) {
  let parts = dateStr.includes("/") ? dateStr.split("/") : dateStr.split("-");
  return { month: parseInt(parts[1], 10), day: parseInt(parts[2], 10) };
}