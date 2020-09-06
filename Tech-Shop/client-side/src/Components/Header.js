import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    Navbar, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    NavbarText
} from 'reactstrap'

function Header() {
    return (
        <div>
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/" style={{fontSize: 48+'px'}}>Tech Shop</NavbarBrand>
            <NavbarText style={{color: "gold",paddingTop: 40+'px'}}>Your very own tagline</NavbarText>
        </Navbar>
        <Navbar color="dark" dark expand="md">
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink to="/dashboard" className='nav-link'> <i className="fa fa-university"></i> Dashboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/inventory" className='nav-link'> <i className="fa fa-database"></i> Inventory</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/orders" className='nav-link'> <i className="fa fa-cart-plus"></i> Orders</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/stats" className='nav-link'> <i className="fa fa-bar-chart"></i> Sales</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
        </div>
    );
}

export default Header;