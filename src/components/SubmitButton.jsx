import { Button } from 'react-bootstrap';
import { Loader } from './Loader';

export const SubmitButton = ({ children, loading }) => {
    return (
        <Button variant='primary' type='submit'>
            {!loading ? (
                children
            ) : (
                <>
                    <Loader />
                    Loading...
                </>
            )}
        </Button>
    );
};
