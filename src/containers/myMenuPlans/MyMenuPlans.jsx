import React from 'react';
import { Segment, Header, Card, Button } from 'semantic-ui-react';
import { useAuthState } from '../../contexts/AuthContext.jsx';
import { apiUtils } from '../../utils/apiUtils.js';

const MyMenuPlans = () => {
  const { username } = useAuthState();
  const [menuPlans, setMenuPlans] = React.useState();

  React.useEffect(() => {
    const opts = apiUtils.makeOptions('GET');
    apiUtils
      .fetchData(`/menuplans/${username}`, opts)
      .then((res) => setMenuPlans(res));
  }, [username]);

  const handleRemoveMenuPlan = (id) => {
    const opts = apiUtils.makeOptions('GET');
    apiUtils
      .fetchData(`/menuplans/remove/${username}/${id}`, opts)
      .then((res) => setMenuPlans(res.menuPlans));
  };

  return (
    <Segment raised style={{ height: '100vh' }}>
      <Header>My Menu Plans</Header>
      <Card.Group itemsPerRow={3}>
        {menuPlans &&
          menuPlans.map((menuPlan) => (
            <Card key={menuPlan.id}>
              <Card.Content>
                <Card.Header>Week {menuPlan.weeknumber}</Card.Header>
                <Card.Description>
                  {menuPlan.dayPlans &&
                    menuPlan.dayPlans.map((dayPlan) => (
                      <p key={dayPlan.id}>
                        {`${dayPlan.weekday}: ${dayPlan.recipeName || ''}`}
                      </p>
                    ))}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='green'>
                    Edit
                  </Button>
                  <Button
                    basic
                    color='red'
                    onClick={() => handleRemoveMenuPlan(menuPlan.id)}
                  >
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
