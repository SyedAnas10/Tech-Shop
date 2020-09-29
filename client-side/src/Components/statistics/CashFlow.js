import React from 'react';
import { Table } from 'reactstrap';

function CashFlow() {

    const Center = {
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return (
        <div style={Center}>
            <Table hover responsive>
                <thead>
                    <tr style={{backgroundColor: 'rgb(48,201,42)', color:"white"}}>
                        <th>Sales Profit</th>
                        <th>Repair Profit</th>
                        <th>Make Profit</th>
                    </tr>
                </thead>
            </Table>

        </div>
    )
}

export default CashFlow;