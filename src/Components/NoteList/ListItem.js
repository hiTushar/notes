import { useState } from "react";
import moment from 'moment';
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Controls from "./Controls";

export default function ListItem(props) {
    const { note, setDeleteModal } = props;
    const navigate = useNavigate();
    const [displayControls, setDisplayControls] = useState(false);
    return (
        <div key={note.id} className='border rounded-2 p-2 mb-1' onMouseOver={() => setDisplayControls(true)} onMouseOut={() => setDisplayControls(false)}>
            <Row>
                <Col md={8}>
                    <span className="fs-6 text-secondary fw-light">{moment(note.timestamp).format('hh:mm A')}</span>
                    <div className="text-truncate">
                        <ReactMarkdown>{note.title}</ReactMarkdown>
                    </div>
                </Col>
                <Col md={4}>
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
        </div>
    )
}
