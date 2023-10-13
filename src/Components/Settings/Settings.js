import { useDispatch, useSelector } from "react-redux";
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import navbarDirection from "../../Redux/Actions/navbarActions";

export default function Settings() {
    const navbar = useSelector(state => state.navbar);
    const dispatch = useDispatch();

    const changeNavbarPosition = (event) => {
        dispatch(navbarDirection(event));
    }

    return (
        <div className="p-5">
            <ToggleButtonGroup type='radio' name='navbar-setting' defaultValue={navbar} onChange={changeNavbarPosition}>
                <ToggleButton id='top' value='top'>Top</ToggleButton>
                <ToggleButton id='side' value='side'>Side</ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}
