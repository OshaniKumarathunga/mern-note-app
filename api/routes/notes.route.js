import express from "express";
import * as noteController from "../controlers/notes.controler.js";

const router = express.Router();

router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNoteById);
router.post("/", noteController.creatNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

export default router;
