import React from 'react';
import {
  useAsyncDispatch,
  useAsyncState,
  asyncFetch
} from '../../contexts/AsyncContext.jsx';
import { Card, Segment, Header } from 'semantic-ui-react';

const Recipes = () => {
  const dispatch = useAsyncDispatch();
  const state = useAsyncState();

  React.useEffect(() => {
    asyncFetch(dispatch, '/recipes', {
      method: 'GET'
    });
  }, [dispatch]);

  return (
    <Segment raised style={{ height: '100vh' }}>
      <Header>All Recipes</Header>
      <Card.Group itemsPerRow={3}>
        {state.payload &&
          state.payload.map((data) => (
            <Card key={data.id}>
              <Card.Content>
                <Card.Header>{data.name}</Card.Header>
                <Card.Description>
                  <p>Preptime: {data.prepTime} minutes</p>
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </Segment>
  );
};

export default Recipes;
