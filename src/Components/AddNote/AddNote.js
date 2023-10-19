import { useEffect, useRef, useState } from "react";
import { Toast, ToastContainer, Button, Card, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
    let titleRef = useRef('');
    let dateTimeRef = useRef(new Date());
    const [note, setNote] = useState(null);
    const [toast, setToast] = useState(false);
    const [reset, setReset] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        // rerendering the component, using 'reset' state, so that we get the current date-time as the title of the new blank note
        setNote('');
        titleRef.current.value = '';
        dateTimeRef.current = new Date();
    }, [reset])

    const onSubmit = (event) => {
        event.preventDefault();
        let allNotes = localStorage.getItem('notes');
        if(allNotes) {
            allNotes = JSON.parse(allNotes);
        }
        else {
            allNotes = [];
        }

        if(!titleRef.current.value.trim().length) {
            titleRef.value.current = note;
        }
        const noteData = {
            id: dateTimeRef.current.valueOf(),
            title: titleRef.current.value.trim(),
            timestamp: dateTimeRef.current.valueOf(),
            content: note
        }

        allNotes.push(noteData);
        localStorage.setItem('notes', JSON.stringify(allNotes));
        setReset(!reset);
        setToast(true);
    }

    return (
        <div className="position-relative">
            <div className="p-3">
                <p className="fs-1">Add a new note</p>
                <Card>
                    <Card.Header>{dateTimeRef.current.toLocaleString('en-IN')}</Card.Header>
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
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                {note && (
                                    <Col>
                                        <Card style={{ padding: '5px 10px', height: '255px', overflow: 'scroll' }}>
                                            <ReactMarkdown>{note}</ReactMarkdown>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                            <Button type='submit' variant='primary'>
                                Submit
                            </Button>
                            <ToastContainer className='p-3' position='bottom-start' style={{ zIndex: 1 }}>
                                <Toast bg='success' onClose={() => setToast(false)} show={toast} delay={3000} autohide >
                                    <Toast.Body><span className="text-light">Note Saved!</span></Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="mt-3">
                    <Button onClick={() => navigate(-1)} type='primary'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
