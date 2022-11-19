import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REGISTRATION } from '../config';
import { Title } from '../components/Title';
import { SubmitButton } from '../components/SubmitButton';
import { HelperContainer } from '../components/HelperContainer';

export const SignUp = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState(null);
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
            .catch((err) => {
                setErr(err.response.data.message);
            })
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
                                value: 1,
                                message: 'Min 1 symbols',
                            },
                        })}
                        type='text'
                        placeholder='enter your name...'
                    />
                    <HelperContainer>
                        {errors?.username && (
                            <p className='text-danger'>
                                {errors?.username?.message || 'Error!'}
                            </p>
                        )}
                    </HelperContainer>
                </Form.Group>
                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='name@example.com'
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message:
                                    'Entered value does not match email format',
                            },
                        })}
                    />
                    <HelperContainer>
                        {errors?.email && (
                            <p className='text-danger'>
                                {errors?.email?.message || 'Error!'}
                            </p>
                        )}
                    </HelperContainer>
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        {...register('password', {
                            required: true,
                            minLength: {
                                value: 1,
                                message: 'min length is 1',
                            },
                        })}
                    />
                    <HelperContainer>
                        {errors?.password && (
                            <p className='text-danger'>
                                {errors?.password?.message || 'Error!'}
                            </p>
                        )}
                    </HelperContainer>
                    <div style={{ height: 15 }}>
                        <p className='text-danger'>{err}</p>
                    </div>
                </Form.Group>
                <SubmitButton loading={loading}>Sign Up</SubmitButton>
            </Form>
        </>
    );
};
