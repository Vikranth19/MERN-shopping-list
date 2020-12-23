import React from 'react'
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';


function AppNavbar() {
    return (
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">ShoppingList</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="https://github.com/Vikranth19">Github</Nav.Link>
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
