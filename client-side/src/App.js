import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Inventory from './Components/inventory/Inventory';
import Statistics from './Components/statistics/Statistics';
import MakeList from './Components/pcMake/PC_Make';
import RepairList from './Components/pcRepairing/pcRepair';

import Dashboard from './Components/Dashboard';
import Header from './Components/Header';
import Sales from './Components/Sales';
import Purchasing from './Components/Purchasing';
import Credit from './Components/credit/Credit';

function App() {

  return (
    <div className="App">
      <BrowserRouter forceRefresh={true}>
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
          <Route path='/credit'>
            <Credit />
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
