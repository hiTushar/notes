import { ListGroup, Row, Col, Modal, Button, PageItem, Pagination } from "react-bootstrap";
import moment from 'moment';
import { useEffect, useState } from "react";
import Controls from "./Controls";
import PaginationComponent from "./Pagination";

const notes_per_page = 5;

export default function NoteList() {
    const [notes, setNotes] = useState(null);
    const [notesDisplay, setNotesDisplay] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [displayControls, setDisplayControls] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        let allNotes = localStorage.getItem("notes");
        if (allNotes) {
            allNotes = JSON.parse(allNotes);
        }
        else {
            allNotes = [];
        }
        setNotes(allNotes);
        setNotesDisplay(allNotes.slice(currentPage, notes_per_page));
    
        let totalNoOfPages = 0;
        if(allNotes.length % notes_per_page !== 0) {
            totalNoOfPages = parseInt(allNotes.length / notes_per_page) + 1;
        }
        else {
            totalNoOfPages = parseInt(allNotes.length / notes_per_page);
        }
        setTotalPage(totalNoOfPages);
    }, [])

    useEffect(() => {
        if(notes !== null)
            setNotesDisplay(notes.slice(currentPage, notes_per_page));
    }, [currentPage, notes])

    const deleteNote = (noteId) => {
        let newNotesList = notes.filter(note => note.id !== noteId);
        setNotes(newNotesList);
        localStorage.setItem('notes', JSON.stringify(newNotesList));
        setDeleteModal(false)
    }

    const getList = () => {
        return (
            <ListGroup>
                {notesDisplay.map((note) => (
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
        );
    };

    console.log(currentPage);
    return (
        <div>{notes && (
            <>
                <div>
                    <div className='mb-2'>
                        <PaginationComponent
                            totalPage={totalPage} 
                            currentPage={currentPage} 
                            setCurrentPage={setCurrentPage}
                            />
                    </div>
                    {getList()}
                </div>
                <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
                    <Modal.Body>
                        Delete this?
                    </Modal.Body>
                    <Modal.Footer style={{ borderTop: 'none' }}>
                        <Button variant='danger' onClick={() => deleteNote(deleteModal)}>
                            Delete
                        </Button>
                        <Button variant='secondary' onClick={() => setDeleteModal(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )}</div>
    )
}
