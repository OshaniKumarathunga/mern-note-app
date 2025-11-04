import { useParams } from "react-router-dom";
import type { Note } from "../models/NoteData";


export default function useNote(notes: Note[]){
    const { id } = useParams<{ id: string }>();
    const note = notes.find((n) => n._id.toString() === id);

    return note;
}