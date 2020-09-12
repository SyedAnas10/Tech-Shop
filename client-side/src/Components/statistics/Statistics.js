import React, { useState } from 'react'
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap'
import PurchaseStats from './PurchaseStats'
import SalesStats from './SalesStats'

function Statistics() {

    const [activeTab, setActiveTab] = useState('1')
    const toggle = (tab) => {
        if(activeTab !== tab)
            setActiveTab(tab)
    }

    return(
        <div>
            <Navbar>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={{active: activeTab === '1'}} onClick={()=>{toggle('1')}}>
                            Sales Stats
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={{active: activeTab === '2'}} onClick={()=>{toggle('2')}}>
                            Purchases Stats
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>

            {activeTab === '1' && <SalesStats/>}
            {activeTab === '2' && <PurchaseStats/>}
        
        </div>
    )
}

export default Statistics