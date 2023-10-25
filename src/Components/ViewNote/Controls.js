import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPrint } from "@fortawesome/free-solid-svg-icons";

export default function Controls(props) {
    const { openDelete, openEdit, openPrint } = props;
    return (
        <div className={"d-flex justify-content-end"}>
            <Button
                onClick={() => openEdit()}
                variant="outline-primary"
                size="sm"
                style={{ border: "none" }}
            >
                <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faPen} />
            </Button>
            <Button
                onClick={() => openPrint()}
                variant="outline-primary"
                size="sm"
                style={{ border: "none" }}
            >
                <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faPrint} />
            </Button>
            <Button
                onClick={() => openDelete()}
                variant="outline-primary"
                size="sm"
                className="p-2"
                style={{ border: "none" }}
            >
                <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faTrash} />
            </Button>
        </div>
    );
}
