import type { Tag } from "./NoteData"

export interface Note{
    id:number,
    title:string,
    content:string,
    date:string,
    tags: Tag[]
}