import React, { useEffect, useState } from 'react'
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap'
import PurchaseStats from './PurchaseStats'
import SalesStats from './SalesStats'
import PCMakingStats from './PCMakingStats'
import PCRepairStats from './PCRepairStats'
import CashFlow from './CashFlow'

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
                            PC Repairing Stats
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={{active: activeTab === '3'}} onClick={()=>{toggle('3')}}>
                            PC Making Stats
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={{active: activeTab === '4'}} onClick={()=>{toggle('4')}}>
                            Purchases Stats
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={{active: activeTab === '5'}} onClick={()=>{toggle('5')}}>
                            Cash Flow
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>

            {activeTab === '1' && <SalesStats/>}
            {activeTab === '2' && <PCRepairStats/>}
            {activeTab === '3' && <PCMakingStats/>}
            {activeTab === '4' && <PurchaseStats/>}
            {activeTab === '5' && <CashFlow/> }
        
        </div>
    )
}

export default Statistics