import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Table from './pages/Table';
import Add from './pages/Add';
import Edit from './pages/Edit';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Table} />
      <Route path="/add" component={Add} />
      <Route path="/edit" component={Edit} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
