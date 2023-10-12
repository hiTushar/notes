import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <Button variant="primary" onClick={() => navigate("/add")}>
                Add Note
            </Button>
        </div>
    );
}
