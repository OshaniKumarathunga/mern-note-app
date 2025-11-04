import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.route.js";
import tagsRouter from "./routes/tags.route.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://note-taking-osh.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// JSON parser
app.use(express.json());

// Health check endpoint (useful for Render)
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// routes
app.use("/api/notes", notesRouter);
app.use("/api/tags", tagsRouter);


//  MongoDB connection + server start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  });