import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faEye } from "@fortawesome/free-solid-svg-icons";

export default function Controls(props) {
    const { openDelete, openEdit, openView } = props;
    return (
        <div className={"d-flex justify-content-between"}>
            <Button
                onClick={() => openView()}
                variant="outline-primary"
                size="sm"
                style={{ border: "none" }}
            >
                <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faEye} />
            </Button>
            <Button
                onClick={() => openEdit()}
                variant="outline-primary"
                size="sm"
                style={{ border: "none" }}
            >
                <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faPen} />
            </Button>
            <Button
                onClick={() => openDelete()}
                variant="outline-primary"
                size="sm"
                className="p-2"
                style={{ border: "none" }}
            >
                <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faTrash} />
            </Button>
        </div>
    );
}
