import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptions: [Object] // برای ذخیره push subscriptions
});

export default mongoose.model("User", UserSchema);
