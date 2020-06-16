import React from 'react';
import { Card, Segment, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { apiUtils } from '../../utils/apiUtils.js';

const Recipes = () => {
  const [recipes, setRecipes] = React.useState();

  React.useEffect(() => {
    const opts = apiUtils.makeOptions('GET');
    apiUtils
      .fetchData('/recipes', opts)
      .then((response) => setRecipes(response));
  }, []);

  return (
    <Segment raised style={{ height: '100vh' }}>
      <Header>All Recipes</Header>
      <Card.Group itemsPerRow={3}>
        {recipes &&
          recipes.map((recipe) => (
            <Card key={recipe.id} as={Link} to={`/details/${recipe.id}`}>
              <Card.Content>
                <Card.Header>{recipe.name}</Card.Header>
                <Card.Description>
                  <p>Preptime: {recipe.prepTime} minutes</p>
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </Segment>
  );
};

export default Recipes;
