import React from 'react';
import { Segment, Header, Card } from 'semantic-ui-react';
import { useAuthState } from '../../contexts/AuthContext.jsx';
import { apiUtils } from '../../utils/apiUtils.js';
import MenuPlanCard from '../../components/myMenuPlans/MenuPlanCard.jsx';

const MyMenuPlans = () => {
  const { username } = useAuthState();
  const [menuPlans, setMenuPlans] = React.useState();

  React.useEffect(() => {
    const opts = apiUtils.makeOptions('GET');
    apiUtils
      .fetchData(`/menuplans/${username}`, opts)
      .then((res) => setMenuPlans(res));
  }, [username]);

  return (
    <Segment raised style={{ height: '100vh' }}>
      <Header>My Menu Plans</Header>
      <Card.Group itemsPerRow={3}>
        {menuPlans &&
          menuPlans.map((menuPlan) => (
            <MenuPlanCard
              key={menuPlan.id}
              menuPlan={menuPlan}
              setMenuPlans={setMenuPlans}
              username={username}
            />
          ))}
      </Card.Group>
    </Segment>
  );
};

export default MyMenuPlans;
