import express from "express";
import User from "../models/User.js";
import webpush from "../notifications/webPush.js";

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { userId, subscription } = req.body;
  const user = await User.findById(userId);
  user.subscriptions.push(subscription);
  await user.save();
  res.json({ msg: "ثبت شد" });
});

router.post("/notify", async (req, res) => {
  const { userId, message } = req.body;
  const user = await User.findById(userId);
  user.subscriptions.forEach(sub => {
    webpush.sendNotification(sub, JSON.stringify({ title: "یادآور", body: message }))
      .catch(err => console.error(err));
  });
  res.json({ msg: "ارسال شد" });
});

export default router;
