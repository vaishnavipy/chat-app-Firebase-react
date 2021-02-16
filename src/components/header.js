import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';


const Header = ({signOut}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function handleSignOut(){
      console.log("clicked")
    signOut()
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Chatty</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
              
            <NavItem >
              <NavLink href="/signup">SignUp</NavLink>
            </NavItem>
          
            <NavItem >
              <NavLink href="/signin">SignIn</NavLink>
            </NavItem>


          
          
          </Nav>
         <NavbarText onClick={handleSignOut}>Sign Out</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header
