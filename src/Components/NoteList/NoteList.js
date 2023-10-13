import { ListGroup } from "react-bootstrap";

export default function NoteList() {
    let allNotes = localStorage.getItem("notes");
    if (allNotes) {
        allNotes = JSON.parse(allNotes);
    }

    const getList = () => {
        return (
            <ListGroup>
                {allNotes.map((note) => <ListGroup.Item key={note.id}>{new Date(note.timestamp).toLocaleString('en-IN')} - {note.title}</ListGroup.Item>)}
            </ListGroup>
        );
    };

    return (
        <div>{allNotes && getList()}</div>
    )
}
