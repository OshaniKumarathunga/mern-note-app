import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }], // references Tag docs
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Note", noteSchema);
