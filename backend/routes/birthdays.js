import express from "express";
import jwt from "jsonwebtoken";
import Birthday from "../models/Birthday.js";

const router = express.Router();

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "توکن وجود ندارد" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "توکن نامعتبر" });
  }
}

router.post("/", auth, async (req, res) => {
  const { name, birthday } = req.body;
  const b = new Birthday({ userId: req.user, name, birthday });
  await b.save();
  res.json(b);
});

router.get("/", auth, async (req, res) => {
  const list = await Birthday.find({ userId: req.user });
  res.json(list);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const b = await Birthday.findById(req.params.id);
    if (!b) return res.status(404).json({ msg: "تولد پیدا نشد" });
    if (b.userId.toString() !== req.user)
      return res.status(401).json({ msg: "دسترسی ندارید" });

    await b.deleteOne();
    res.json({ msg: "تولد حذف شد" });
  } catch (err) {
    res.status(500).json({ msg: "خطای سرور" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { name, birthday } = req.body;
    const b = await Birthday.findById(req.params.id);
    if (!b) return res.status(404).json({ msg: "تولد پیدا نشد" });
    if (b.userId.toString() !== req.user)
      return res.status(401).json({ msg: "دسترسی ندارید" });

    b.name = name || b.name;
    b.birthday = birthday || b.birthday;
    await b.save();
    res.json(b);
  } catch (err) {
    res.status(500).json({ msg: "خطای سرور" });
  }
});

export default router;
