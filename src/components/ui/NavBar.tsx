import React, { ChangeEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Form, NavDropdown } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';

export const NavBar = () => {
    const [search, setSearch] = useState('');
    const { role, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        console.log(value);
        setSearch(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/search/' + search);
    };

    return (
        <React.Fragment>
            <Navbar expand="lg" bg="dark" variant="dark" className="mb-3">
                <Container fluid>
                    <Navbar.Brand as={NavLink} to="/">
                        <img
                            width="30"
                            src="https://res.cloudinary.com/dorp0y1wz/image/upload/v1659318503/sneakers/sneakers-logo_ypiewd.jpg"
                            alt="Sneakers store logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand as={NavLink} to="/">
                        Sneakers Store
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" />

                    <Navbar.Collapse>
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                size="sm"
                                aria-label="Search"
                                value={search}
                                onChange={handleChange}
                            />
                        </Form>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link as={NavLink} to="/">
                                Products
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/brands">
                                Brands
                            </Nav.Link>
                            {!role ? (
                                <Nav.Link as={NavLink} to="/login">
                                    Log in
                                </Nav.Link>
                            ) : (
                                <>
                                    <NavDropdown title={user}>
                                        {role === 'ADMIN_ROLE' && (
                                            <>
                                                <NavDropdown.ItemText
                                                    as={NavLink}
                                                    to="/add/product"
                                                    className="text-decoration-none text-reset"
                                                >
                                                    Create Product
                                                </NavDropdown.ItemText>
                                                <NavDropdown.ItemText
                                                    as={NavLink}
                                                    to="/add/brand"
                                                    className="text-decoration-none text-reset"
                                                >
                                                    Create Brand
                                                </NavDropdown.ItemText>
                                                <NavDropdown.Divider />
                                            </>
                                        )}
                                        <NavDropdown.ItemText
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </NavDropdown.ItemText>
                                    </NavDropdown>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
};
