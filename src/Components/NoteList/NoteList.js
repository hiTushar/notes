import { ListGroup, Row, Col, Modal, Button } from "react-bootstrap";
import moment from 'moment';
import { useEffect, useState } from "react";
import Controls from "./Controls";

export default function NoteList() {
    const [notes, setNotes] = useState(null)
    const [displayControls, setDisplayControls] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        let allNotes = localStorage.getItem("notes");
        if (allNotes) {
            allNotes = JSON.parse(allNotes);
        }
        setNotes(allNotes)
    }, [])

    const deleteNote = (noteId) => {
        let newNotesList = notes.filter(note => note.id !== noteId);
        setNotes(newNotesList);
        localStorage.setItem('notes', JSON.stringify(newNotesList));
        setDeleteModal(false)
    }

    const getList = () => {
        return (
            <>
                <ListGroup>
                    {notes.map((note) => (
                        <div onMouseEnter={() => setDisplayControls(true)} onMouseLeave={() => setDisplayControls(false)}>
                            <ListGroup.Item key={note.id}>
                                <Row>
                                    <Col>
                                        <b>{moment(note.timestamp).format('hh:mm A, Do MMM \'YY, dddd')}</b> - {note.title}
                                    </Col>
                                    <Col>
                                        {
                                            displayControls ? (
                                                <div className='d-flex justify-content-end'>
                                                    <Controls openDelete={() => setDeleteModal(note.id)} />
                                                </div>
                                            ) : <></>
                                        }
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </div>
                    ))}
                </ListGroup>
                <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
                    <Modal.Header>
                        Modal
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant='danger' onClick={() => deleteNote(deleteModal)}>
                            Delete
                        </Button>
                        <Button variant='secondary' onClick={() => setDeleteModal(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };

    return (
        <div>{notes && getList()}</div>
    )
}
