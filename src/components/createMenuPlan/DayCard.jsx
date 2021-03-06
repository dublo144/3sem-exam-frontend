import React from 'react';
import { Card, Dropdown, Input } from 'semantic-ui-react';

const DayCard = ({ dayname, choices, selectedChoices, setSelectedChoices }) => {
  const handleChange = (e, { value, options }) => {
    const recipe = options.filter((option) => option.key === value);
    const recipeName = recipe[0] && recipe[0].text;

    setSelectedChoices({
      ...selectedChoices,
      menuPlans: [
        ...selectedChoices.menuPlans,
        { weekday: dayname, recipeId: value, recipeName, servings: 2 }
      ]
    });
  };

  return (
    <>
      <Card>
        <Card.Content>
          <Card.Header>{dayname}</Card.Header>
          <Card.Description>
            <Dropdown
              placeholder='Select Recipe'
              selection
              clearable
              loading={!choices}
              options={choices}
              onChange={handleChange}
            />
            <Input type={'number'} placeholder={'Servings'} />
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  );
};

export default DayCard;
