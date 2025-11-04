import { useState, type FormEvent } from "react";
import { Button, Col, Form, FormControl, FormGroup, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { NoteFormData , Tag } from "../models/NoteData"; 
import CreatableReactSelect from "react-select/creatable";
import { createTag } from "../services/tag.api";

type NoteFormProps = {
    onSubmit: (data:NoteFormData) => void
    onAddTag:(tag:Tag) => void
    initialData?: NoteFormData
    availableTags: Tag[]
}

export default function NoteForm({onSubmit,onAddTag, initialData , availableTags} : NoteFormProps) {
    const [title, setTitle] = useState(initialData?.title || "")
    const [content, setContent] = useState(initialData?.content || "")
    const [selectedTags, setSelectedTags] = useState<Tag[]>(initialData?.tags || [])

    function handleTitleChange (e:React.ChangeEvent<HTMLInputElement>){
        setTitle(e.target.value);
    }
    function handleContentChange(e:React.ChangeEvent<HTMLInputElement>){
        setContent(e.target.value);
    }
    function handleFormSubmit(e:FormEvent){
        e.preventDefault()
        const newNote : NoteFormData = {
            title : title,
            content : content,
            tags:selectedTags
        }
        onSubmit(newNote)
        console.log(availableTags)
    }
    return(
        <>
        <Form onSubmit={handleFormSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                    <FormGroup controlId="title">
                        <Form.Label>Title</Form.Label>
                        <FormControl type="text" value={title} placeholder="Write your title of the note" onChange={handleTitleChange} required ></FormControl>
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup controlId="tag">
                        <Form.Label>Tags</Form.Label>
                        <CreatableReactSelect 
                        value={selectedTags.map(tag => {return{label:tag.label, value:tag._id}})} 
                        onCreateOption={async (label) => {
                            //const newTag = { label}
                            const createdTag = await createTag(label);
                            setSelectedTags(prev => [...prev, createdTag])
                            onAddTag(createdTag);
                        }}
                        onChange={(tags) => {
                            setSelectedTags(tags.map(tag => ({ _id: tag.value,label: tag.label })));
                        }}
                        options={availableTags.map(tag => { return {label:tag.label, value:tag._id} })}
                        isMulti
                        />
                    </FormGroup>
                    </Col>
                </Row>
                <FormGroup controlId="markdown">
                        <Form.Label>Content</Form.Label>
                        <FormControl value={content} placeholder="Write your note" onChange={handleContentChange} required  as="textarea" rows={15}></FormControl>
                </FormGroup>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to="..">
                    <Button type="button" variant="outline-secondary">Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
        </>
    )
}