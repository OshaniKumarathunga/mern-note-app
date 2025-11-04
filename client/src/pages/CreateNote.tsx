import { useNavigate } from "react-router-dom";
//import type { NoteData, Tag } from "../types/NoteData";
import NoteForm from "../components/NoteForm";
import { createNote } from "../services/notes.api";
import type { Tag  , NoteFormData} from "../models/NoteData";
import { prepareNotePayload } from "../utils/note.utils";


type CreateNoteProps = {
  //onSubmit : (data:NoteFormData) => void
  onAddTag:(tag:Tag) => void
  availableTags: Tag[]
}
export default function CreateNote({ onAddTag, availableTags}: CreateNoteProps) {
  const navigate = useNavigate()

  async function handleSubmit(data: NoteFormData) {
    try{
      const notePayload = await prepareNotePayload(data);
      await createNote(notePayload)
      //if (onSubmit) onSubmit(newNote)
      navigate(`/`);
    } catch (error) {
     console.error("Failed to create note:", error);
    }
}


  return (
  <>
  <h4>Create New Note</h4>
  <NoteForm onSubmit={handleSubmit} availableTags={availableTags} onAddTag={onAddTag}/>
  </>
  )
  
}

