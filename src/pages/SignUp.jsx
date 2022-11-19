import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REGISTRATION } from '../config';
import { Title } from '../components/Title';
import { SubmitButton } from '../components/SubmitButton';

export const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = (data) => {
        setLoading(true);

        axios
            .post(REGISTRATION, data)
            .then((response) => {
                navigate('/signin');
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
        reset();
    };

    return (
        <>
            <Title>Sign Up</Title>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                style={{ maxWidth: '850px', margin: 'auto' }}
            >
                <Form.Group className='mb-3' controlId='username'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        {...register('username', {
                            required: 'required!',
                            minLength: {
                                value: 2,
                                message: 'Min 2 symbols',
                            },
                        })}
                        type='text'
                        placeholder='enter your name...'
                    />
                    <div style={{ height: 20 }}>
                        {errors?.username && (
                            <p className='text-danger'>
                                {errors?.username?.message || 'Error!'}
                            </p>
                        )}
                    </div>
                </Form.Group>
                <Form.Group className='mb-3' controlId='userEmail'>
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
                <SubmitButton loading={loading}>Sign Up</SubmitButton>
            </Form>
        </>
    );
};
