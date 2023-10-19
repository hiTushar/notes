import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PaginationComponent from "./Pagination";
import Search from "./Search";
import List from "./List";
import moment from "moment";

const notes_per_page = 5;

export default function NoteList() {
    const [notes, setNotes] = useState([]);
    const [notesDisplay, setNotesDisplay] = useState([]);
    const [notesSearched, setNotesSearched] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const [searchVal, setSearchVal] = useState("");

    useEffect(() => {
        let allNotes = localStorage.getItem("notes");
        if (allNotes) {
            allNotes = JSON.parse(allNotes);
        } else {
            allNotes = [];
        }
        setNotes(allNotes);
    }, []);

    useEffect(() => {
        let filteredNotes = notes.filter((item) => {
            if (searchVal.length) {
                return (
                    item.title.toLowerCase().includes(searchVal.toLowerCase()) ||
                    item.content.toLowerCase().includes(searchVal.toLowerCase())
                );
            }
            return true;
        });
        setNotesSearched(filteredNotes);

        let reorganizedNotesList = reorganizeNotes(filteredNotes);
        let dateSectionsAll = Object.keys(reorganizedNotesList);
        setTotalPage(getTotalPages(dateSectionsAll, notes_per_page));
        setCurrentPage(0);

        let dateSectionsToDisplay = dateSectionsAll.slice(0, notes_per_page);
        let reorganizedNotesToDisplay = dateSectionsToDisplay.reduce(
            (all, dateSection) => {
                all[dateSection] = [...reorganizedNotesList[dateSection]];
                return all;
            },
            {}
        );
        setNotesDisplay(reorganizedNotesToDisplay);
    }, [searchVal, notes]);

    useEffect(() => {
        let reorganizedNotesList = reorganizeNotes(notesSearched);
        let dateSectionsAll = Object.keys(reorganizedNotesList);
        setTotalPage(getTotalPages(dateSectionsAll, notes_per_page));

        let dateSectionsToDisplay = dateSectionsAll.slice(
            currentPage * notes_per_page,
            currentPage * notes_per_page + notes_per_page
        );
        let reorganizedNotesToDisplay = dateSectionsToDisplay.reduce(
            (all, dateSection) => {
                all[dateSection] = [...reorganizedNotesList[dateSection]];
                return all;
            },
            {}
        );
        setNotesDisplay(reorganizedNotesToDisplay);
    }, [currentPage, notesSearched]);

    const reorganizeNotes = (allNotes) => {
        let reorganizeNotes = allNotes.reduce((all, note) => {
            let date = moment(note.timestamp).startOf("date");
            if (!all[date]) {
                all[date] = [];
            }
            all[date].push(note);
            return all;
        }, {});
        return reorganizeNotes;
    };

    const getTotalPages = (currentNotes, notes_per_page) => {
        let totalNoOfPages = 0;
        if (currentNotes.length % notes_per_page !== 0) {
            totalNoOfPages = parseInt(currentNotes.length / notes_per_page) + 1;
        } else {
            totalNoOfPages = parseInt(currentNotes.length / notes_per_page);
        }
        return totalNoOfPages;
    };

    const deleteNote = (noteId) => {
        let newNotesList = notes.filter((note) => note.id !== noteId);
        setNotes(newNotesList);
        localStorage.setItem("notes", JSON.stringify(newNotesList));
        setDeleteModal(false);
    };

    return (
        <div>
            {notes && (
                <>
                    <div>
                        {notes.length ? (
                            <Search searchVal={searchVal} setSearchVal={setSearchVal} />
                        ) : (
                            <></>
                        )}
                        {Object.keys(notesDisplay).length ? (
                            <>
                                <PaginationComponent
                                    totalPage={totalPage}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                />
                                <List
                                    notesDisplay={notesDisplay}
                                    setDeleteModal={setDeleteModal}
                                />
                            </>
                        ) : (
                            <></>
                        )}
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
                </>
            )}
        </div>
    );
}
