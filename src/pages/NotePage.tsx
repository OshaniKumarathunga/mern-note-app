import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import type { Note } from "../models/NoteData";
import { Link, useNavigate } from "react-router-dom";
import useNote from "../hooks/useNote";

type NoteProps = {
  notes: Note[];
  onDelete: (id: string) => void;
};

export default function NotePage({ notes , onDelete  }: NoteProps) {
  const note = useNote(notes)
  const navigate = useNavigate()

  if (note == null) return <p>Note not found</p>;

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h3>{note.title}</h3>
          {note.tags?.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags?.map((tag) => (
                <Badge className="text-truncate" key={tag._id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note._id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => {
                onDelete(note._id);
                navigate("/");
              }}
            >
              Delete{" "}
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <div>
        <p style={{ whiteSpace: "pre-wrap" }}>{note.content}</p>
        <small className="text-muted">
          Created on: {new Date(note.createdAt).toLocaleString()}
        </small>
      </div>
    </>
  );
}
