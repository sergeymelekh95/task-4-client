import { Spinner } from 'react-bootstrap';

export const Loader = ({ size, animation }) => {
    return (
        <Spinner
            as='span'
            animation={animation || 'grow'}
            size={size || 'sm'}
            role='status'
            aria-hidden='true'
        />
    );
};
