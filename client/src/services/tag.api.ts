import { API_BASE_URL } from "./config.ts";
import type { Tag } from "../models/NoteData.ts";

export async function fetchTags(): Promise<Tag[]> {
  const response = await fetch(`${API_BASE_URL}/tags`);
  if (!response.ok) throw new Error("Failed to fetch tags");
  return response.json();
}

export async function createTag(label:string): Promise<Tag> {
  const response = await fetch(`${API_BASE_URL}/tags`, {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ label })
  });
  if (!response.ok) throw new Error("Failed to create tag");
  return response.json();
}

export async function updateTag(id:string, label:string): Promise<Tag> {
    const response = await fetch(`${API_BASE_URL}/tags/${id}`, {
        method:"PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ label }),
    });
    if (!response.ok) throw new Error("Failed to update tag");
    return response.json();
}


export async function deleteTag(id:string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tags/${id}`, {
    method:"DELETE"
  });
  if (!response.ok) throw new Error("Failed to delete tag");
}