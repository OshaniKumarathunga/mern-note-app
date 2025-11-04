import { useNavigate } from "react-router-dom";
import useNote from "../hooks/useNote";
import NoteForm from "../components/NoteForm";
import type { Note , Tag, NoteFormData} from "../models/NoteData";
import { updateNote } from "../services/notes.api";
import { prepareNotePayload } from "../utils/note.utils";


type EditNoteProps = {
    notes: Note[]
    availableTags: Tag[]
    // onEdit: (id: number, data: NoteData) => void
    onAddTag:(tag:Tag) => void
}
export default function EditNote({notes, availableTags, onAddTag}: EditNoteProps) {
    const note = useNote(notes)
    const navigate = useNavigate();

    async function handleSubmit(data: NoteFormData) {
        if (!note) return; 

        try{
            const notePayload = await prepareNotePayload(data)
            await updateNote(note._id, notePayload)
            navigate(`/${note._id}`);
        } catch (error) {
         console.error("Failed to update note:", error);
        }
    }

    return(
        <>
        <h4>Edit Note</h4>
        <NoteForm onSubmit={handleSubmit} onAddTag= {onAddTag} initialData={note} availableTags={availableTags}/>
        </>
    )
}