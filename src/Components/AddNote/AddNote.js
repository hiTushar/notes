import { useRef, useState } from "react";
import { Container, Button, Card, Form, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

export default function AddNote() {
    let titleRef = useRef(null);
    const [note, setNote] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();
        let allNotes = localStorage.getItem('notes');
        if(allNotes) {
            allNotes = JSON.parse(allNotes);
        }
        else {
            allNotes = [];
        }

        const noteData = {
            id: allNotes.length + 1,
            title: titleRef.current.value,
            note
        }
        allNotes.push(noteData);
        localStorage.setItem('notes', JSON.stringify(allNotes));
    }

    return (
        <Container>
            <Card>
                <Card.Header>Add a new note</Card.Header>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='Enter the title'
                                ref={titleRef}
                            />
                        </Form.Group>
                        
                        <Row className="mt-2 mb-2">
                            <Col>
                                <Form.Group controlId='content'>
                                    <Form.Control 
                                        as='textarea'
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        rows={10}
                                        placeholder='Type here'
                                    />
                                </Form.Group>
                            </Col>
                            {note && (
                                <Col>
                                    <Card style={{ padding: '5px 10px', height: '255px' }}>
                                        <ReactMarkdown>{note}</ReactMarkdown>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                        <Button type='submit' variant='primary'>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}
