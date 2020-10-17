import React, { useState } from 'react';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import PurchaseCredit from './PurchaseCredit';
import SalesCredit from './SalesCredit';

function Credit() {

    const [activeTab, setActiveTab] = useState('1')
    const toggle = (tab) => {
        if(activeTab != tab)
            setActiveTab(tab)
    }

    return (
        <div>
            <Navbar>
                <Nav tabs>
                    <NavItem>
                        <NavLink href='#' className={{active: activeTab === '1'}} onClick={()=>{toggle('1')}}>
                            Sales Credit
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='#' className={{active: activeTab === '2'}} onClick={()=>{toggle('2')}}>
                            Purchase Credit
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>

            {activeTab === '1' && <SalesCredit />}
            {activeTab === '2' && <PurchaseCredit />}
        
        </div>
    )
}

export default Credit