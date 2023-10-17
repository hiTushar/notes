import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NoteList from "../NoteList/NoteList";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="p-3">
            <p className="fs-1">Home</p>
                <Col>
                    <Button className='mb-3' variant="primary" onClick={() => navigate("/add")}>
                        Add Note
                    </Button>
                </Col>
                <Col></Col>
            <Row>
                <Col>
                    <NoteList />
                </Col>
            </Row>
        </div>
    );
}
