import React from 'react';
import { useParams } from 'react-router-dom';
import { Segment, Header } from 'semantic-ui-react';
import { apiUtils } from '../../utils/apiUtils';
import Instructions from '../../components/recipeDetails/Instructions.jsx';
import Ingredients from '../../components/recipeDetails/Ingredients.jsx';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = React.useState();

  React.useEffect(() => {
    const opts = apiUtils.makeOptions('GET');
    apiUtils
      .fetchData(`/recipes/${recipeId}`, opts)
      .then((recipe) => setRecipe(recipe));
  }, [recipeId]);

  return (
    <Segment raised style={{ height: '100vh' }}>
      {recipe && (
        <>
          <Header>{recipe.name}</Header>
          <p>Preparation Time: {recipe.prepTime} minutes</p>
          <p>Category: {recipe.category}</p>
          <Instructions directions={recipe.directions} />
          <Ingredients ingredients={recipe.ingredients} />
        </>
      )}
    </Segment>
  );
};

export default RecipeDetails;
