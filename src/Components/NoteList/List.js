import { Card, Col, Row } from "react-bootstrap";
import ListItem from "./ListItem";
import moment from "moment";

export default function List(props) {
    const { notesDisplay, setDeleteModal } = props;
    return Object.keys(notesDisplay).map((date) => {
        return (
            <Card className="mb-3 p-3">
                <Card.Title>{moment(date).format("ddd, Do MMM 'YY")}</Card.Title>
                <Card.Body>
                    <Row>
                        {notesDisplay[date].map((note) => (
                            <Col md={6}>
                                <ListItem note={note} setDeleteModal={setDeleteModal} />
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        );
    });
}
