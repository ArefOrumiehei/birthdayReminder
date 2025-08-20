import cron from "node-cron";
import Birthday from "../models/Birthday.js";
import User from "../models/User.js";
import webpush from "../notifications/webPush.js";

export const startCronJobs = () => {
  cron.schedule("0 10 * * *", async () => {
    const today = new Date();
    const birthdays = await Birthday.find();

    birthdays.forEach(async (b) => {
      const bday = new Date(b.birthday);
      bday.setFullYear(today.getFullYear());

      if (bday < today) {
        bday.setFullYear(today.getFullYear() + 1);
      }

      const diffDays = Math.ceil((bday - today) / (1000 * 60 * 60 * 24));

      if (diffDays === 3 || diffDays === 0) {
        const user = await User.findById(b.userId);
        user.subscriptions.forEach((sub) => {
          webpush
            .sendNotification(
              sub,
              JSON.stringify({
                title: "🎉 یادآور تولد",
                body:
                  diffDays === 0
                    ? `امروز تولد ${b.name} هست!`
                    : `فقط ۳ روز مونده تا تولد ${b.name}!`,
              })
            )
            .catch((err) => console.error(err));
        });
      }
    });
  });

  console.log("✅ Cron jobs started...");
};
