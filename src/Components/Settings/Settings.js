import { useDispatch, useSelector } from "react-redux";
import { Card, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import navbarDirection from "../../Redux/Actions/navbarActions";

export default function Settings() {
    const navbar = useSelector(state => state.navbar);
    const dispatch = useDispatch();

    const changeNavbarPosition = (event) => {
        dispatch(navbarDirection(event));
    }

    return (
        <div className="p-3">
            <p className="fs-1">Settings</p>
            <Card style={{ width: '500px' }}>
                <Card.Body>
                    <Card.Title className="mb-4">Change Navigation Bar Position</Card.Title>
                    <Card.Text>
                        <ToggleButtonGroup type='radio' name='navbar-setting' defaultValue={navbar} onChange={changeNavbarPosition}>
                            <ToggleButton id='top' value='top'>Top</ToggleButton>
                            <ToggleButton id='side' value='side'>Side</ToggleButton>
                        </ToggleButtonGroup>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
