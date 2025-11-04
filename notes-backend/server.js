import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.route.js";
import tagsRouter from "./routes/tags.route.js";
dotenv.config();

//middleware
const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://note-taking-osh.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// routes
app.use("/api/notes", notesRouter);
app.use("/api/tags", tagsRouter);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));


