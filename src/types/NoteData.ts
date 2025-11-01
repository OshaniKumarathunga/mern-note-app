export interface NoteData{
    title:string,
    content:string,
    date:string
    tags?: Tag[]
}

export type Tag = {
  id: string
  label: string
}