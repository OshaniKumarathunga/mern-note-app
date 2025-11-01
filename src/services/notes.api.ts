import { API_BASE_URL } from "./config.ts";
import type { Note, NotePayload } from "../models/NoteData.ts";

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetch(`${API_BASE_URL}/notes`);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
}

export async function createNote(data: NotePayload): Promise<Note> {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return response.json();
}

export async function updateNote(id:string, data: NotePayload): Promise<Note> {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method:"PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error("Failed to update note");
  }
  return response.json();
}
  
export async function deleteNote(id:string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method:"DELETE"
  });
  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
}
