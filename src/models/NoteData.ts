export type Tag = {
  _id: string;
  label: string;
};

//what the user types in the form
export type NoteFormData = {
  title: string;
  content: string;
  tags: Tag[];
};

//what comes back from the backend
export type Note = {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];         // ← Each note can have multiple tags
  createdAt: string;
 // userId?: string;     // optional, if you add login later
};

//what we send to backend (tag IDs)
export type NotePayload = {
  title: string;
  content: string;
  tags: string[];  // only tag IDs when creating or updating
};
