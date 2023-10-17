import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

export default function Controls(props) {
    const { openDelete, openEdit } = props;
    return (
        <div className={'d-flex justify-content-between'} style={{width: '70px'}}>
            <Button onClick={() => openDelete()} variant='outline-primary' size='sm' className="p-2" style={{ border: 'none' }}>
                <FontAwesomeIcon style={{ fontSize: '15px' }} icon={faTrash} />
            </Button>
            <Button onClick={() => openEdit()} variant='outline-primary' size='sm' style={{ border: 'none' }}>
                <FontAwesomeIcon style={{ fontSize: '15px' }} icon={faPen} />
            </Button>
        </div>
    )
}
