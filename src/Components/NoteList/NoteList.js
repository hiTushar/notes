import { ListGroup } from "react-bootstrap";
import moment from 'moment';

export default function NoteList() {
    let allNotes = localStorage.getItem("notes");
    if (allNotes) {
        allNotes = JSON.parse(allNotes);
    }

    const getList = () => {
        return (
            <ListGroup>
                {allNotes.map((note) => <ListGroup.Item key={note.id}><b>{moment(note.timestamp).format('hh:mm A, Do MMM \'YY, dddd')}</b> - {note.title}</ListGroup.Item>)}
            </ListGroup>
        );
    };

    return (
        <div>{allNotes && getList()}</div>
    )
}
