import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NoMatch from '../containers/noMatch';
import Scrape from '../containers/scrape/Scrape.jsx';
import Jokes from '../containers/jokes';
import Home from '../containers/home/Home.jsx';
import ProtectedRoute from '../components/routes/ProtectedRoute.jsx';
import Unauthorized from '../containers/unauthorized';
import Recipes from '../containers/recipes/Recipes.jsx';
import CreateMenuPlan from '../containers/createMenuPlan/CreateMenuPlan.jsx';
import MyMenuPlans from '../containers/myMenuPlans/MyMenuPlans.jsx';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <ProtectedRoute authenticatedRoles={['admin']} path='/jokes'>
        <Jokes />
      </ProtectedRoute>

      <ProtectedRoute authenticatedRoles={['admin']} path='/scrape'>
        <Scrape />
      </ProtectedRoute>

      <ProtectedRoute authenticatedRoles={['user']} path='/createMenuPlan'>
        <CreateMenuPlan />
      </ProtectedRoute>

      <Route path='/recipes'>
        <Recipes />
      </Route>

      <Route path='/myMenuPlans'>
        <MyMenuPlans />
      </Route>

      <Route path='/unauthorized'>
        <Unauthorized />
      </Route>

      <Route>
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default Routes;
