import { useEffect, useRef, useState } from "react";
import {
    Toast,
    ToastContainer,
    Button,
    Card,
    Form,
    Row,
    Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
    let titleRef = useRef(null);
    const [content, setContent] = useState(null);
    const [toast, setToast] = useState(false);
    const [currentNote, setCurrentNote] = useState({});

    const navigate = useNavigate();

    const { noteId } = useParams();

    useEffect(() => {
        let allNotes = localStorage.getItem("notes");
        if (allNotes) {
            allNotes = JSON.parse(allNotes);
        } else {
            allNotes = [];
        }
        let editNote = allNotes.find((note) => note.id === parseInt(noteId));
        setCurrentNote({ ...editNote });

        titleRef.current.value = editNote.title;
        setContent(editNote.content);
    }, [noteId]);

    const onSubmit = (event) => {
        event.preventDefault();
        let allNotes = localStorage.getItem("notes");
        if (allNotes) {
            allNotes = JSON.parse(allNotes);
        } else {
            allNotes = [];
        }

        let editNoteIndex = allNotes.findIndex(
            (note) => note.id === parseInt(noteId)
        );

        const noteData = {
            id: currentNote.timestamp,
            title: titleRef.current.value,
            timestamp: currentNote.timestamp,
            content: content,
        };

        allNotes[editNoteIndex] = { ...noteData };
        localStorage.setItem("notes", JSON.stringify(allNotes));
        setToast(true);
    };

    return (
        <div className="position-relative">
            <div className="p-3">
                <p className="fs-1">Edit note</p>
                <Card>
                    <Card.Header>
                        {new Date(currentNote.timestamp).toLocaleString("en-IN")}
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the title"
                                    ref={titleRef}
                                />
                            </Form.Group>
                            <Row className="mt-2 mb-2">
                                <Col>
                                    <Form.Group controlId="content">
                                        <Form.Control
                                            as="textarea"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            rows={10}
                                            placeholder="Type here"
                                        />
                                    </Form.Group>
                                </Col>
                                {content && (
                                    <Col>
                                        <Card style={{ padding: "5px 10px", height: "255px" }}>
                                            <ReactMarkdown>{content}</ReactMarkdown>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                            <Button type="submit" variant="primary">
                                Save
                            </Button>
                            &nbsp;
                            <Button variant="secondary" onClick={() => navigate("/")}>
                                Cancel
                            </Button>
                            <ToastContainer
                                className="p-3"
                                position="bottom-start"
                                style={{ zIndex: 1 }}
                            >
                                <Toast
                                    bg="success"
                                    onClose={() => setToast(false)}
                                    show={toast}
                                    delay={3000}
                                    autohide
                                >
                                    <Toast.Body>
                                        <span className="text-light">Note Saved!</span>
                                    </Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="mt-3">
                    <Button onClick={() => navigate(-1)} type="primary">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
