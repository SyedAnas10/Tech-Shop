import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    Navbar, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    NavbarText
} from 'reactstrap';

import { useDispatch } from 'react-redux';
import { fetch_sales_by_date, 
        fetch_pc_making_by_date, 
        fetch_pc_repair_by_date } from '../Redux/ActionCreators.js';

function Header() {
    const dispatch = useDispatch();

    const fetchData = () => {
        const date = new Date();

        const date_string = date.toString();
        const month = date_string.slice(4, 7);
        const day = date_string.slice(8, 10);
        const year = date_string.slice(11, 15);

        fetch_sales_by_date(day, month, year);
        fetch_pc_making_by_date(day, month, year);
        fetch_pc_repair_by_date(day, month, year);
    }

    return (
        <div>
        <Navbar style={{backgroundColor:'rgb(48,201,42)'}} dark expand="md">
            <NavbarBrand href="/" style={{fontSize: 48+'px'}}>Tech Shop</NavbarBrand>
            <NavbarText style={{paddingTop: 40+'px'}}>Your very own tagline</NavbarText>
        </Navbar>

        {/* LINKS TO EACH COMPONENT FOR BROWSER ROUTER */}
        <Navbar style={{backgroundColor:'rgb(48,201,42)'}} dark expand="md">
            <Nav className="container-fluid" navbar>
                <NavItem>
                    <NavLink to="/dashboard" className='nav-link'> <i className="fa fa-university"></i> Dashboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/inventory" className='nav-link'> <i className="fa fa-database"></i> Inventory</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/pc-repairing" className='nav-link'> <i className="fa fa-wrench"></i> Repairing</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/pc-making" className='nav-link'> <i className="fa fa-desktop"></i> Making</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/stats" className='nav-link'> <i className="fa fa-bar-chart"></i> Sales </NavLink>
                </NavItem>


                <NavItem className='ml-auto'>
                    <NavLink to="/purchases" className='nav-link'> <i className="fa fa-credit-card" style={{fontSize:20+'px'}}></i> </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/sales" className='nav-link'> <i className="fa fa-cart-plus" style={{fontSize:30+'px'}}></i> </NavLink>
                </NavItem>

            </Nav>
        </Navbar>
        </div>
    );
}

export default Header;