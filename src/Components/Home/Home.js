import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NoteList from "../NoteList/NoteList";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="p-5">
            <Button variant="primary" onClick={() => navigate("/add")}>
                Add Note
            </Button>
            <Container>
                <NoteList />
            </Container>
        </div>
    );
}
