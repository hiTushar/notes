import { Link } from "react-router-dom";
import { Navbar as NavbarBS, Nav } from 'react-bootstrap';

export default function NavbarComponent(props) {
    const { style } = props;

    return (
        <NavbarBS className='p-3 bg-primary-subtle' style={{ ...style }}>
            <Nav className='m-auto d-flex' variant='underline' defaultActiveKey="home" style={{ flexDirection: style.linkFlex }}>
                <Nav.Item>
                    <Nav.Link eventKey='home' as={Link} to='/'>
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='settings' as={Link} to='/settings'>
                        Settings
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </NavbarBS>
    );
}
