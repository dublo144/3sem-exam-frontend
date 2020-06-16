import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';
import { apiUtils } from '../../utils/apiUtils';

const MenuPlanCard = ({ menuPlan, setMenuPlans, username }) => {
  const handleRemoveMenuPlan = (id) => {
    const opts = apiUtils.makeOptions('GET');
    apiUtils
      .fetchData(`/menuplans/remove/${username}/${id}`, opts)
      .then((res) => setMenuPlans(res.menuPlans));
  };
  return (
    <Card>
      <Card.Content>
        <Card.Header>Week {menuPlan.weeknumber}</Card.Header>
        <Card.Description>
          {menuPlan.dayPlans &&
            menuPlan.dayPlans.map((dayPlan) => (
              <p key={dayPlan.id}>
                {dayPlan.weekday}:{' '}
                <Link to={`/details/${dayPlan.recipeId}`}>
                  {dayPlan.recipeName || ''}
                </Link>
              </p>
            ))}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Get Shopping List
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
  );
};

export default MenuPlanCard;
