import { Trash3, Unlock } from 'react-bootstrap-icons';
import { ButtonToolbar, Button } from 'react-bootstrap';

export const Toolbar = ({ handleDelete, handleStatus, loading }) => {
    return (
        <ButtonToolbar
            aria-label='Toolbar with button groups'
            style={{ justifyContent: 'flex-end', width: '100%' }}
        >
            <Button
                disabled={loading}
                variant='outline-primary'
                className='me-2'
                onClick={() => handleStatus(true)}
            >
                Block
            </Button>
            <Button
                disabled={loading}
                variant='outline-primary'
                className='me-2'
                onClick={() => handleStatus(false)}
            >
                <Unlock size={25} />
            </Button>{' '}
            <Button
                disabled={loading}
                variant='outline-primary'
                className='me-2'
                onClick={handleDelete}
            >
                <Trash3 size={25} />
            </Button>{' '}
        </ButtonToolbar>
    );
};
