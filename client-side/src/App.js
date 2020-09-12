import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import Inventory from './Components/inventory/Inventory';
import Statistics from './Components/Statistics';
import MakeList from './Components/pcMake/PC_Make';
import RepairList from './Components/pcRepairing/pcRepair';
import Sales from './Components/Sales';
import Purchasing from './Components/Purchasing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

{/* PATHS FOR LEFT SIDE NAV-BAR ITEMS */}
        <Switch>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/inventory'>
            <Inventory />
          </Route>
          <Route path='/pc-repairing'>
            <RepairList />
          </Route>
          <Route path='/pc-making'>
            <MakeList />
          </Route>
          <Route path='/stats'>
            <Statistics />
          </Route>

{/* PATHS FOR RIGHT SIDE NAV-BAR ITEMS */}
          <Route path='/purchases'>
            <Purchasing />
          </Route>
          <Route path='/sales'>
            <Sales />
          </Route>

{/* REDIRECT TO DASHBOARD IN CASE OF ROUTE MISMATCH */}
          <Route path='/'>
            <Redirect to='/dashboard'/>
          </Route>
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
