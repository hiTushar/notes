import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/notes">All Notes</Link>
            </div>
            <div>
                <Link to="/settings">Settings</Link>
            </div>
        </div>
    );
}
