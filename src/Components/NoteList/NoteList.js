import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PaginationComponent from "./Pagination";
import Search from "./Search";
import List from "./List";

const notes_per_page = 5;

export default function NoteList() {
    const [notes, setNotes] = useState([]);
    const [notesDisplay, setNotesDisplay] = useState([]);
    const [notesSearched, setNotesSearched] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const [searchVal, setSearchVal] = useState('');

    useEffect(() => {
        let allNotes = localStorage.getItem("notes");
        if (allNotes) {
            allNotes = JSON.parse(allNotes);
        }
        else {
            allNotes = [];
        }
        setNotes(allNotes);
    }, [])

    useEffect(() => {
        let filteredNotes = notes.filter(item => {
            if(searchVal.length) {
                return item.title.toLowerCase().includes(searchVal.toLowerCase()) || item.note.toLowerCase().includes(searchVal.toLowerCase())
            }
            return true;
        });
        setNotesSearched(filteredNotes);
        setNotesDisplay(filteredNotes.slice(0, notes_per_page));
        setTotalPage(getTotalPages(filteredNotes, notes_per_page));
        setCurrentPage(0);
    }, [searchVal, notes])

    useEffect(() => {
        setNotesDisplay(notesSearched.slice(currentPage * notes_per_page, (currentPage * notes_per_page) + notes_per_page));
    }, [currentPage, notesSearched])

    const getTotalPages = (currentNotes, notes_per_page) => {
        let totalNoOfPages = 0;
        if(currentNotes.length % notes_per_page !== 0) {
            totalNoOfPages = parseInt(currentNotes.length / notes_per_page) + 1;
        }
        else {
            totalNoOfPages = parseInt(currentNotes.length / notes_per_page);
        }
        return totalNoOfPages;
    }

    const deleteNote = (noteId) => {
        let newNotesList = notes.filter(note => note.id !== noteId);
        setNotes(newNotesList);
        localStorage.setItem('notes', JSON.stringify(newNotesList));
        setDeleteModal(false)
    }

    return (
        <div>{notes && (
            <>
                <div>
                    {
                        notesDisplay.length ? (
                            <>
                                <Search searchVal={searchVal} setSearchVal={setSearchVal} />
                                <PaginationComponent
                                    totalPage={totalPage} 
                                    currentPage={currentPage} 
                                    setCurrentPage={setCurrentPage}
                                />
                                <List notesDisplay={notesDisplay} setDeleteModal={setDeleteModal} />
                            </>
                        ) : <></>
                    }
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
