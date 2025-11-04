import Note from "../models/note.model.js";

// GET all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().populate("tags").sort({createdAt:-1})
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Get note by ID
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).populate("tags");
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const creatNote = async (req, res) => {
    try {
        const {title , content, tags}=req.body;
        const newNote = await Note.create({title , content, tags});
        const savedNote = await newNote.save();
         // Populate the tags before sending back to frontend
        const populatedNote = await savedNote.populate("tags");
        res.status(201).json(populatedNote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        const updatedNote = await Note.findById(req.params.id).populate("tags");
        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// export controller functions so routes can import them
export { getAllNotes, getNoteById, creatNote, updateNote, deleteNote };
