import { Form, Table } from 'react-bootstrap';
import { Row } from './Row';
import { Title } from './Title';

export const TableUsers = ({
    users,
    handleTable,
    selectedUsers,
    isAll,
    selectAll,
}) => {
    return (
        <>
            <Title>Users</Title>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <Form.Check
                                type={'checkbox'}
                                id={`default-checkbox`}
                                checked={isAll}
                                onChange={() => selectAll(!isAll)}
                            />
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Registration</th>
                        <th>Last login</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <Row
                            key={user._id}
                            {...user}
                            handleTable={handleTable}
                            checked={selectedUsers.some(
                                (el) => el._id === user._id
                            )}
                        />
                    ))}
                </tbody>
            </Table>
        </>
    );
};
