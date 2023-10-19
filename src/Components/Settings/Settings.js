import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    ToggleButton,
    ToggleButtonGroup,
    Row,
    Col,
} from "react-bootstrap";
import navbarDirection from "../../Redux/Actions/navbarActions";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

export default function Settings() {
    const navbar = useSelector((state) => state.navbar);
    const dispatch = useDispatch();

    const { theme, toggleTheme } = useContext(ThemeContext);

    const changeNavbarPosition = (event) => {
        dispatch(navbarDirection(event));
    };

    const changeTheme = () => {
        toggleTheme();
    };

    return (
        <div className="p-3">
            <p className="fs-1">Settings</p>
            <Row>
                <Col>
                    <Card style={{ width: "500px" }}>
                        <Card.Body>
                            <Card.Title className="mb-4">
                                Change Navigation Bar Position
                            </Card.Title>
                            <Card.Text>
                                <ToggleButtonGroup
                                    type="radio"
                                    name="navbar-setting"
                                    defaultValue={navbar}
                                    onChange={changeNavbarPosition}
                                >
                                    <ToggleButton id="top" value="top">
                                        Top
                                    </ToggleButton>
                                    <ToggleButton id="side" value="side">
                                        Side
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: "500px" }}>
                        <Card.Body>
                            <Card.Title className="mb-4">Change Theme</Card.Title>
                            <Card.Text>
                                <ToggleButtonGroup
                                    type="radio"
                                    name="theme-setting"
                                    defaultValue={theme}
                                    onChange={changeTheme}
                                >
                                    <ToggleButton id="light" value="light">
                                        Light
                                    </ToggleButton>
                                    <ToggleButton id="dark" value="dark">
                                        Dark
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
