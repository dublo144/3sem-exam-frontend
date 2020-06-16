import React from 'react';
import { List, Header } from 'semantic-ui-react';
import uuid from 'react-uuid';

const Instructions = ({ directions }) => {
  return (
    <>
      <Header>Directions</Header>
      <List bulleted>
        {directions.map((direction) => (
          <List.Item key={uuid()}>{direction}</List.Item>
        ))}
      </List>
    </>
  );
};
export default Instructions;
