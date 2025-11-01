import type { NoteFormData, Tag, NotePayload } from "../models/NoteData";
import { fetchTags,createTag } from "../services/tag.api";


export async function prepareNotePayload(data: NoteFormData): Promise<NotePayload> {
    const existingTags = await fetchTags();
    // Ensure all tags exist and get their _id
  const ensuredTags: Tag[] = await Promise.all(
    data.tags.map(async (tag) => {
      // If tag already has _id, keep it
      if (tag._id) return tag;

      // Check if a tag with same label exists
      const found = existingTags.find(t => t.label.toLowerCase() === tag.label.toLowerCase());
      if (found) return found;

      const newTag = await createTag(tag.label );
      return newTag;
    })
  );

  return {
    title: data.title,
    content: data.content,
    tags: ensuredTags.map((t) => t._id), // only send _id
  };
}
