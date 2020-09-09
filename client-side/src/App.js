import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import Inventory from './Components/inventory/Inventory';
import Orders from './Components/Orders';
import Statistics from './Components/Statistics';
import MakeList from './Components/pcMake/PC_Make';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Switch>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/inventory'>
            <Inventory />
          </Route>
          <Route path='/pc-making'>
            <MakeList />
          </Route>
          <Route path='/stats'>
            <Statistics />
          </Route>
          <Route path='/orders'>
            <Orders />
          </Route>
          <Route path='/'>
            <Redirect to='/dashboard'/>
          </Route>
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
