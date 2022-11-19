import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_USERS, DELETE_USERS, UPDATE_USER } from '../config';
import { TableUsers } from '../components/TableUsers';
import { Toolbar } from '../components/Toolbar';
import { Loader } from '../components/Loader';

export const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isAll, setAll] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const selectAll = (state) => setAll(state);

    const handleTable = ({ _id, email }) => {
        !selectedUsers.some((el) => el._id === _id)
            ? setSelectedUsers([...selectedUsers, { _id, email }])
            : setSelectedUsers(selectedUsers.filter((el) => el._id !== _id));
    };

    const hasToken = (data) => data.hasOwnProperty('token');

    const getUsers = () => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if (userData && hasToken(userData)) {
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };

            setLoading(true);

            axios
                .post(ALL_USERS, { email: userData.email }, config)
                .then((response) => setUsers(response.data))
                .catch((err) => navigate('/signin'))
                .finally(() => setLoading(false));
        } else {
            navigate('/signin');
        }
    };

    const handleDelete = () => {
        if (selectedUsers.length) {
            const userData = JSON.parse(sessionStorage.getItem('userData'));

            if (userData && hasToken(userData)) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                    data: {
                        emails: selectedUsers.reduce(
                            (acc, el) => [...acc, el.email],
                            []
                        ),
                    },
                };

                setLoading(true);

                axios
                    .delete(DELETE_USERS, config)
                    .then((response) => getUsers())
                    .catch((err) => navigate('/signin'))
                    .finally(() => setLoading(false));

                const isAuthorizedUser = selectedUsers.find(
                    (selectedUser) => selectedUser.email === userData.email
                );

                if (isAuthorizedUser) {
                    sessionStorage.removeItem('userData');
                    navigate('/signin');
                }
            } else {
                navigate('/signin');
            }

            setSelectedUsers([]);
            setAll(false);
        }
    };

    const handleStatus = (status) => {
        if (selectedUsers.length) {
            const userData = JSON.parse(sessionStorage.getItem('userData'));

            if (userData && hasToken(userData)) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                };

                const body = {
                    emails: selectedUsers.reduce(
                        (acc, el) => [...acc, el.email],
                        []
                    ),
                    status: status,
                };

                setLoading(true);

                axios
                    .put(UPDATE_USER, body, config)
                    .then((response) => {
                        getUsers();
                    })
                    .catch((err) => {
                        navigate('/signin');
                    })
                    .finally(() => setLoading(false));
            } else {
                navigate('/signin');
            }

            setSelectedUsers([]);
            setAll(false);
        }
    };

    useEffect(() => {
        isAll
            ? setSelectedUsers(
                  users.reduce(
                      (acc, elem) => [
                          ...acc,
                          { _id: elem._id, email: elem.email },
                      ],
                      []
                  )
              )
            : setSelectedUsers([]);
    }, [isAll, users]);

    useEffect(() => getUsers(), []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Toolbar
                handleDelete={handleDelete}
                handleStatus={handleStatus}
                loading={loading}
            />
            <div style={{ height: '50px' }}>
                {loading && <Loader animation='border' size='lg' />}
            </div>
            {!!users.length && (
                <TableUsers
                    users={users}
                    handleTable={handleTable}
                    selectedUsers={selectedUsers}
                    isAll={isAll}
                    selectAll={selectAll}
                />
            )}
        </div>
    );
};
