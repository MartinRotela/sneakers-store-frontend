import React, { useMemo } from 'react';
import { Form, Container, Row, Button, Alert } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { User } from '../../interface/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login } from '../../store/slices/auth/thunks';

const LoginScreen = () => {
    const { errorMessage, isLoading } = useAppSelector((state) => state.auth);
    const { values, handleInputChange } = useForm<User>({
        email: '',
        password: '',
    });
    const dispatch = useAppDispatch();

    const isChecking = useMemo(() => isLoading === true, [isLoading]);

    const { email, password } = values;

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div>
            <Container>
                <Row>
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={handleInputChange}
                            />
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {errorMessage && (
                            <Alert className="mt-2" variant="danger">
                                {errorMessage}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            variant="dark"
                            disabled={isChecking}
                            className="mt-2"
                        >
                            Login
                        </Button>
                    </Form>
                </Row>
            </Container>
        </div>
    );
};

export default LoginScreen;
