import { useState } from "react";
import moment from 'moment';
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { ListGroup, Row, Col } from "react-bootstrap";
import Controls from "./Controls";

export default function ListItem(props) {
    const { note, setDeleteModal } = props;
    const { navigate } = useNavigate();
    const [displayControls, setDisplayControls] = useState(false);
    return (
        <ListGroup>
            <div key={note.id} onMouseOver={() => setDisplayControls(true)} onMouseOut={() => setDisplayControls(false)}>
                <ListGroup.Item>
                    <Row>
                        <Col>
                            <b>{moment(note.timestamp).format('hh:mm A, Do MMM \'YY, dddd')}</b> - <div className="text-truncate"><ReactMarkdown>{note.title}</ReactMarkdown></div>
                        </Col>
                        <Col>
                            {
                                displayControls ? (
                                    <div className='d-flex justify-content-end'>
                                        <Controls
                                            openDelete={() => setDeleteModal(note.id)} 
                                            openEdit={() => navigate(`/edit/${note.id}`)}    
                                        />
                                    </div>
                                ) : <></>
                            }
                        </Col>
                    </Row>
                </ListGroup.Item>
            </div>
        </ListGroup>
    )
}
