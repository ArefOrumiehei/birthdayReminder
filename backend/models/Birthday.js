import mongoose from "mongoose";

const BirthdaySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  birthday: Date,
});

export default mongoose.model("Birthday", BirthdaySchema);
