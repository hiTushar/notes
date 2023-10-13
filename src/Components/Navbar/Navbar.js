import { Link } from "react-router-dom";
import { Navbar as NavbarBS, Nav } from 'react-bootstrap';

export default function NavbarComponent(props) {
    const { style } = props;

    return (
        <NavbarBS className='p-3' style={{ border: 'solid 1px', width: style.width, display: 'flex', flexDirection: style.linkFlex }}>
            <Nav>
                <Link to="/">Home</Link>
            </Nav>
            <Nav>
                <Link to="/settings">Settings</Link>
            </Nav>
        </NavbarBS>
    );
}
