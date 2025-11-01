import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Route, Routes, Link } from "react-router-dom"
import CreateNote from "./pages/CreateNote"
import NoteList from "./components/NoteList"
import NotePage from "./pages/NotePage"
import TagManage from "./pages/TagManage"
import { useEffect, useState } from "react"
// import { dummyNotes } from "./data/dummyNotes"
import EditNote from "./pages/EditNote"
import { fetchNotes , deleteNote} from "./services/notes.api"
import { fetchTags , createTag } from "./services/tag.api"
import type { Note , Tag } from "./models/NoteData"

function App() {
  // const savedNotes:Note[] = JSON.parse(localStorage.getItem("notes") || "[]")
  // const savedTags:Tag[] = JSON.parse(localStorage.getItem("tags") || "[]")

  const [notes , setNotes] = useState<Note[]>([]);
  const [tags , setTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function loadData() {
      const [notesData, tagsData] = await Promise.all([fetchNotes(), fetchTags()]);
      setNotes(notesData);
      setTags(tagsData);
    }
    loadData();
  }, [])

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes))
  // }, [notes])

  // useEffect(() => {
  //   localStorage.setItem("tags", JSON.stringify(tags))
  // }, [tags])

  // async function onCreateNote(data : NoteData) {
  //   const newNote = await createNote(data)
  //   setNotes(prevNotes => [...prevNotes, newNote])
  // }

  // async function onEditNote(id:number , updatedData:NoteData) {
  //   setNotes(preNotes  => preNotes.map(note => note.id === id ?  {...note , ...updatedData} : note ))
  // }

  // function onDeleteNote (id: number) {
  //   setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  // }

  async function handleDeleteNote(id: string) {
    try {
      await deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  }

  async function onAddTag (newTag:Tag) {
    const savedTag =  await createTag(newTag.label)
    setTags(prevTags => [...prevTags, savedTag])
  }

  const  handleUpdateTag = (updatedTag: Tag) => {
  setTags(prev => prev.map(t => t._id === updatedTag._id ? updatedTag : t));
}

 const handleDeleteTag = (deletedTagId: string) => {
  setTags(prev => prev.filter(t => t._id !== deletedTagId));
}


  return ( 
  <>
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Note Taking App
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link as={Link} to="/"> Home</Nav.Link> */}
              <Nav.Link as={Link} to="/create">
              <Button variant="primary">Create Note </Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/tags">
              <Button variant="secondary">Manage Tags </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    <Container className="my-4">
      <Routes>
        {/* <Route path="/" element={<Home/>} />  */}
        <Route path="/" element={<NoteList notes={notes} availableTags={tags}/>}/>
        <Route path="/create" element={<CreateNote onAddTag={onAddTag} availableTags={tags} />} />
        <Route path="/:id" element={<NotePage notes={notes} onDelete={handleDeleteNote} />}/>
        <Route path="/:id/edit" element={<EditNote notes={notes} availableTags={tags} onAddTag={onAddTag} />} />
        <Route path="/tags" element={<TagManage tags={tags} onDeleteTag={handleDeleteTag} onUpdateTag={handleUpdateTag} />}/>
      </Routes>
    </Container>

  </>
    
  )
}

export default App
