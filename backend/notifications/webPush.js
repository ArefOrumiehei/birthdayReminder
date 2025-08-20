import webpush from "web-push";
import dotenv from "dotenv";
dotenv.config();

webpush.setVapidDetails(
  "mailto:neymarjraref15@gmail.com",
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

export default webpush;
