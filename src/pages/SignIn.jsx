import { Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTHENTICATION } from '../config';
import { Title } from '../components/Title';
import { SubmitButton } from '../components/SubmitButton';

export const SignIn = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = (data) => {
        setLoading(true);

        sessionStorage.removeItem('userData');

        axios
            .post(AUTHENTICATION, data)
            .then((response) => {
                sessionStorage.setItem(
                    'userData',
                    JSON.stringify(response.data)
                );
                navigate('/dashboard');
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
        reset();
    };

    return (
        <>
            <Title>Sign In</Title>
            <Form
                style={{ maxWidth: '850px', margin: 'auto' }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Form.Group className='mb-3' controlId='user-email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='name@example.com'
                        {...register('email', {
                            required: true,
                        })}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Col>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            {...register('password', {
                                required: true,
                            })}
                        />
                    </Col>
                </Form.Group>
                <SubmitButton loading={loading}>Sign In</SubmitButton>
            </Form>
        </>
    );
};
