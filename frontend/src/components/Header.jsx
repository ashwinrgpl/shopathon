import React from 'react';
import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { logoutUser } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            dispatch(logoutUser());
            navigate('/login');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                    <img src={logo} height={50} className="shopathon-logo" alt="Shopathon" />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                        <Nav.Link>
                            <FaShoppingCart /> Cart
                            {cartItems.length > 0 && (
                                <Badge pill bg="info" style={{ marginLeft: '5px' }}>
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </Badge>
                            )}
                        </Nav.Link>
                        </LinkContainer>
                    </Nav>
                    {userInfo ? (
                        <Nav>
                            <NavDropdown
                                title={userInfo.name}
                                id="username"
                            >
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav>
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <FaUser /> Login
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>

    </header>  
    )
}

export default Header;