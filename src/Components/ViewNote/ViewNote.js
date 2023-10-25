import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import Controls from "./Controls";

export default function ViewNote(props) {
    const navigate = useNavigate();
    let titleRef = useRef({});
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState(null);
    const [currentNote, setCurrentNote] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);
    const noteRef = useRef();
    const { noteId } = useParams();

    useEffect(() => {
        let allNotes = localStorage.getItem("notes");
        if (allNotes) {
            allNotes = JSON.parse(allNotes);
        } else {
            allNotes = [];
        }
        setNotes(allNotes);
        let editNote = allNotes.find((note) => note.id === parseInt(noteId));
        setCurrentNote({ ...editNote });

        titleRef.current.value = editNote.title;
        setContent(editNote.content);
    }, [noteId]);

    const deleteNote = (noteId) => {
        let newNotesList = notes.filter((note) => note.id !== noteId);
        setNotes(newNotesList);
        localStorage.setItem("notes", JSON.stringify(newNotesList));
        setDeleteModal(false);
    };

    const printNote = useReactToPrint({
        content: () => noteRef.current,
        documentTitle: `${currentNote.title} - ${new Date(currentNote.timestamp).toLocaleString("en-IN")}`
    })

    const getPageMargins = () => {
        return `@page { margin: 50px 50px 50px 50px !important; }`;
    };

    return (
        <div>
            <Row>
                <Col>
                    <Button onClick={() => navigate(-1)} type="primary">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                </Col>
                <Col>
                    <Controls
                        openDelete={() => setDeleteModal(currentNote.id)}
                        openEdit={() => navigate(`/edit/${currentNote.id}`)}
                        openPrint={printNote}
                    />
                </Col>
            </Row>
            <div ref={noteRef}>
                <style>{getPageMargins()}</style>
                <Card className="mt-3">
                    <Card.Header>{moment(currentNote.timestamp).format("hh:mm A, dddd, Do MMM 'YY")}</Card.Header>
                    <Card.Body>
                        <Card.Title>{titleRef.current.value}</Card.Title>
                        <ReactMarkdown>
                            {content}  
                        </ReactMarkdown>
                    </Card.Body>
                </Card>
            </div>
            <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
                <Modal.Body>Delete this?</Modal.Body>
                <Modal.Footer style={{ borderTop: "none" }}>
                    <Button variant="danger" onClick={() => deleteNote(deleteModal)}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setDeleteModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
