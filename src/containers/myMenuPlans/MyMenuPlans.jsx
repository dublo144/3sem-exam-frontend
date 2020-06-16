import React from 'react';
import { Segment, Header, Card, Button } from 'semantic-ui-react';
import {
  useAsyncDispatch,
  asyncFetch,
  useAsyncState
} from '../../contexts/AsyncContext.jsx';
import { useAuthState } from '../../contexts/AuthContext.jsx';

const MyMenuPlans = () => {
  const dispatch = useAsyncDispatch();
  const state = useAsyncState();
  const { username } = useAuthState();

  React.useEffect(() => {
    asyncFetch(dispatch, `/menuplans/${username}`, {
      method: 'GET'
    });
  }, [dispatch, username]);

  return (
    <Segment raised style={{ height: '100vh' }}>
      <Header>My Menu Plans</Header>
      <Card.Group itemsPerRow={3}>
        {state.payload &&
          state.payload.map((menuPlan) => (
            <Card key={menuPlan.id}>
              <Card.Content>
                <Card.Header>Week {menuPlan.weeknumber}</Card.Header>
                <Card.Description>
                  {menuPlan.dayPlans &&
                    menuPlan.dayPlans.map((dayPlan) => (
                      <p>{`${dayPlan.weekday}: ${dayPlan.recipeName || ''}`}</p>
                    ))}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='green'>
                    Edit
                  </Button>
                  <Button basic color='red'>
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </Segment>
  );
};

export default MyMenuPlans;
