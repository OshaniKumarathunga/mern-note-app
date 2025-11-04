import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.route.js";
import tagsRouter from "./routes/tags.route.js";

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/notes", notesRouter);
app.use("/api/tags", tagsRouter);

app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
