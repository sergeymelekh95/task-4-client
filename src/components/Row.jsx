import { Form } from 'react-bootstrap';

const addZero = (num) => (num < 10 ? `0${num}` : num);

const getUserDate = (ms) => {
    const date = new Date(ms);
    return `${addZero(date.getDate())}.${addZero(
        date.getMonth() + 1
    )}.${date.getFullYear()} / ${addZero(date.getHours())}:${addZero(
        date.getMinutes()
    )}`;
};

export const Row = ({
    _id,
    username,
    email,
    registrationDate,
    lastLogin,
    isBlock,
    handleTable,
    checked,
}) => {
    return (
        <tr>
            <td>
                <Form.Check
                    type={'checkbox'}
                    _id={_id}
                    onChange={() => handleTable({ _id, email })}
                    checked={checked}
                />
            </td>
            <td>{_id}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{getUserDate(new Date(registrationDate))}</td>
            <td>
                {lastLogin
                    ? getUserDate(new Date(lastLogin))
                    : 'no login attempts'}
            </td>
            <td>{isBlock ? 'blocked' : 'active'}</td>
        </tr>
    );
};
