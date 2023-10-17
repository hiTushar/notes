import { Link } from "react-router-dom";
import { Navbar as NavbarBS, Nav } from 'react-bootstrap';
import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

export default function NavbarComponent(props) {
    const { style } = props;
    const { theme } = useContext(ThemeContext);

    return (
        <NavbarBS className={`p-3 ${theme === 'dark' ? 'bg-secondary' : 'bg-primary-subtle'}`} style={{ ...style }}>
            <Nav className='m-auto d-flex' variant='underline' defaultActiveKey="home" style={{ flexDirection: style.linkFlex }}>
                <Nav.Item>
                    <Nav.Link className={`${theme === 'dark' ? 'text-light' : ''}`} eventKey='home' as={Link} to='/'>
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={`${theme === 'dark' ? 'text-light' : ''}`} eventKey='settings' as={Link} to='/settings'>
                        Settings
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </NavbarBS>
    );
}
