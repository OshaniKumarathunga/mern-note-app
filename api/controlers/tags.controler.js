import Tag from "../models/tag.model.js";

const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createTag = async (req, res) => {
    try {
        const { label } = req.body;
        const existing = await Tag.findOne({ label });
        if (existing) {
            return res.status(400).json({ message: "Tag already exists" });
        }               
        const tag = new Tag({ label });
        const saved = await tag.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const updateTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tag) {
            return res.status(404).json({ message: "Tag not found" });
        }
        res.status(200).json(tag);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteTag = async (req, res) => {
    try {
        await Tag.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Tag deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export { getAllTags, createTag, updateTag, deleteTag };