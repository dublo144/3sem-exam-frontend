import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NoMatch from '../containers/noMatch';
import Home from '../containers/home/Home.jsx';
import ProtectedRoute from '../components/routes/ProtectedRoute.jsx';
import Unauthorized from '../containers/unauthorized';
import Recipes from '../containers/recipes/Recipes.jsx';
import CreateMenuPlan from '../containers/createMenuPlan/CreateMenuPlan.jsx';
import MyMenuPlans from '../containers/myMenuPlans/MyMenuPlans.jsx';
import RecipeDetails from '../containers/recipeDetails/RecipeDetails.jsx';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <ProtectedRoute
        authenticatedRoles={['user', 'admin']}
        path='/createMenuPlan'
      >
        <CreateMenuPlan />
      </ProtectedRoute>

      <Route path={`/details/:recipeId`}>
        <RecipeDetails />
      </Route>

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
