import { Container, ListGroup } from "react-bootstrap";

export default function NoteList() {
    let allNotes = localStorage.getItem("notes");
    if (allNotes) {
        allNotes = JSON.parse(allNotes);
    }

    const getList = () => {
        return (
            <ListGroup>
                {allNotes.map((note) => <ListGroup.Item key={note.id}>{note.title}</ListGroup.Item>)}
            </ListGroup>
        );
    };

    return (
        <Container>{allNotes && getList()}</Container>
    )
}
