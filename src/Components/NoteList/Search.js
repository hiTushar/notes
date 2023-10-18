import { Row, Col, InputGroup, Form } from "react-bootstrap";

export default function Search(props) {
    const { searchVal, setSearchVal } = props;

    return (
        <Row className="mb-3">
            <Col>
                <InputGroup>
                    <Form.Control 
                        type='text'
                        placeholder='Search here'
                        onChange={e => setSearchVal(e.target.value.trim())}
                        value={searchVal}
                    />
                </InputGroup>
            </Col>
            <Col></Col>
        </Row>
    )
}
