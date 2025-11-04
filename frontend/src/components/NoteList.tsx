import { Badge, Card, Col, Form, FormControl, FormGroup, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select"
import { Link } from "react-router-dom";
import type { Note, Tag } from "../models/NoteData";
import { useMemo, useState } from "react";

type NoteListProps = {
    notes: Note[]
    availableTags: Tag[]
}

export default function NoteList({notes, availableTags}: NoteListProps) {
  const [title, setTitle] = useState("")
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesTitle = title === "" || note.title.toLowerCase().includes(title.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => note.tags?.some(noteTag => noteTag._id === tag._id)) 
      return matchesTitle && matchesTags
    })
  }, [title,selectedTags, notes])
    return (
      <>
        <Form>
          <Row className="mb-4">
            <Col>
              <FormGroup controlId="title">
                <Form.Label>Title</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Search for a note with title"
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                ></FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup controlId="tag">
                <Form.Label>Tags</Form.Label>
                <ReactSelect
                  value={selectedTags.map(tag => {return{label:tag.label, value:tag._id}})}
                  onChange={(tags) => {
                            setSelectedTags(tags.map(tag => ({ label: tag.label, _id: tag.value })));
                        }}
                  options={availableTags.map(tag => { return {label:tag.label, value:tag._id} })}
                  isMulti
                /> 
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
          {filteredNotes.map((note)=> (
            <Col key={note._id}>
              <Card 
              className="h-100 text-reset text-decoration-none" as={Link} to={`/${note._id}`}>
                <Card.Body>
                  <Stack gap={2} className="align-items-center justify-content-center h-100">
                     <span className="fs-5">{note.title}</span>
                     {note.tags?.map((tag) => (
                      <Badge className="text-truncate" key={tag._id}>{tag.label} </Badge>
                     ))}
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
            ))}
        </Row>
      </>
      // <div>
      //     <h1>List of Notes</h1>
      //     {dummyNotes.map((note) => (
      //         <div key={note.id}>
      //             <h3>{note.title}</h3>
      //             <p>{note.content}</p>
      //             <small>{new Date(note.date).toLocaleString()}</small>
      //         </div>
      //     ))}
      // </div>
    );
}