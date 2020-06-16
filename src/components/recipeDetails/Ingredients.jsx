import React from 'react';
import { Header, List } from 'semantic-ui-react';
import uuid from 'react-uuid';

const Ingredients = ({ ingredients }) => {
  return (
    <>
      <Header>Ingredients</Header>
      <List>
        {ingredients.map((ingredient) => (
          <List.Item
            key={uuid()}
          >{`${ingredient.amount}g ${ingredient.name}`}</List.Item>
        ))}
      </List>
    </>
  );
};

export default Ingredients;
