import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import type { Tag } from "../models/NoteData";
import { updateTag, deleteTag } from "../services/tag.api";
import { useNavigate } from "react-router-dom";

type TagManageProps = {
    tags: Tag[]
    onUpdateTag: (updatedTag:Tag) => void
    onDeleteTag: (id: string) => void
}
export default function TagManage({tags , onUpdateTag, onDeleteTag}: TagManageProps) {
    const [editingTagId, setEditingTagId] = useState<string|null>(null);
    const [label, setLabel] = useState("");
    const navigate = useNavigate();

    async function handleUpdate(tag: Tag){
        try{
            const updated = await updateTag(tag._id, label)
            onUpdateTag(updated)
            setEditingTagId(null);
            navigate(`/`);
        } catch (error){
            console.error("Failed to update tag:", error);
    }
}

    async function handleDelete(id:string){
        try{
            await deleteTag(id)
            onDeleteTag(id)
        } catch (error){
            console.error("Failed to delete tag:", error);
        }
    }

     return (
    <Stack gap={2}>
        {tags.map((tag) =>
        <Stack key={tag._id} direction="horizontal" gap={2} className="align-items-center">
            {editingTagId === tag._id? (
            <>
              <Form.Control value={label}  onChange={e=> setLabel(e.target.value)}/>
              <Button onClick={() => handleUpdate(tag)} >Save</Button>
              <Button variant="outline-secondary" onClick={() => setEditingTagId(null)}>Cancel</Button>
            </>
            ) : (
            <>
              <span>{tag.label}</span>
              <Button 
              onClick={() => {
                setEditingTagId(tag._id);
                setLabel(tag.label);
            }} >Edit</Button>
              <Button variant="outline-danger" onClick={() => handleDelete(tag._id)}>Delete</Button>
            </>
            )}
        </Stack>
        )}
    </Stack>
  );
}