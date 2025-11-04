import express from "express";
import * as tagController from "../controlers/tags.controler.js";

const router = express.Router();


router.get("/", tagController.getAllTags);
router.post("/", tagController.createTag);
router.put("/:id", tagController.updateTag);
router.delete("/:id", tagController.deleteTag);


export default router;
