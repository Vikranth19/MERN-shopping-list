import React, {Fragment} from 'react'
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';
import {useDispatch,useSelector } from 'react-redux';
import RegisterModal from './auth/RegisterModal';
import Login from './auth/Login';
import Logout from './auth/Logout';


function AppNavbar() {
    const auth = useSelector(state => state.auth);

    const {isAuthenticated, user} = auth;
    return (
  <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">ShoppingList</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      {isAuthenticated?
        <Fragment>
          <Nav.Item>
            <span className="navbar-text mr-3">
              <strong>{user? `Welcome ${user.name}` : ''}</strong>
            </span>
          </Nav.Item>
          <Nav.Item>
            <Logout/>
          </Nav.Item>
        </Fragment> :

        <Fragment>
          <Nav.Item>
            <RegisterModal/>
          </Nav.Item>
          <Nav.Item>
            <Login/>
          </Nav.Item>
        </Fragment>
    
      }
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
    )
}

export default AppNavbar
