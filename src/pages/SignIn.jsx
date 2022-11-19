import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTHENTICATION } from '../config';
import { Title } from '../components/Title';
import { SubmitButton } from '../components/SubmitButton';
import { HelperContainer } from '../components/HelperContainer';

export const SignIn = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

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
                setErr(null);
                navigate('/dashboard');
            })
            .catch((err) => {
                setErr(err.response.data.message);
            })
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
                    <div style={{ height: 20 }}>
                        <p className='text-danger'>{err}</p>
                    </div>
                </Form.Group>
                <SubmitButton loading={loading}>Sign In</SubmitButton>
            </Form>
        </>
    );
};
