import { ListGroup } from "react-bootstrap";
import ListItem from "./ListItem";

export default function List(props) {
    const { notesDisplay, setDeleteModal } = props;
    return (
        <ListGroup>
            {notesDisplay.map((note) => <ListItem note={note} setDeleteModal={setDeleteModal} />)}
        </ListGroup>
    )
}
