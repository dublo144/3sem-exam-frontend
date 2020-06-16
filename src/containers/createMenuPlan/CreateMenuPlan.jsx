import React from 'react';
import { Input, Card, Button } from 'semantic-ui-react';
import DayCard from '../../components/createMenuPlan/DayCard.jsx';
import {
  useAsyncDispatch,
  useAsyncState,
  asyncFetch
} from '../../contexts/AsyncContext.jsx';
import { useAuthState } from '../../contexts/AuthContext.jsx';
import { useHistory } from 'react-router-dom';

const CreateMenuPlan = () => {
  const dispatch = useAsyncDispatch();
  const state = useAsyncState();
  const { username } = useAuthState();

  let history = useHistory();

  const [selectedChoices, setSelectedChoices] = React.useState({
    menuPlans: []
  });

  React.useEffect(() => {
    asyncFetch(dispatch, '/recipes', {
      method: 'GET'
    });
  }, [dispatch]);

  const createChoices = () => {
    return (
      state.payload &&
      state.payload.map((recipe) => ({
        key: recipe.id,
        text: recipe.name,
        value: recipe.id
      }))
    );
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setSelectedChoices({ ...selectedChoices, [name]: value });
  };

  const handleSubmit = () => {
    asyncFetch(dispatch, '/menuplans/create', {
      method: 'POST',
      body: {
        ...selectedChoices,
        username
      }
    });
    history.push('/myMenuPlans');
  };

  return (
    <>
      <Input
        name={'weeknumber'}
        className={'spacing-vertical'}
        label={'Menu Plan for week number:'}
        placeholder='Week Number...'
        onChange={handleChange}
        value={selectedChoices.weeknumber}
      />
      <Card.Group itemsPerRow={4} centered={true}>
        <DayCard
          dayname={'Monday'}
          choices={createChoices()}
          selectedChoices={selectedChoices}
          setSelectedChoices={setSelectedChoices}
        />
        <DayCard
          dayname={'Tuesday'}
          choices={createChoices()}
          selectedChoices={selectedChoices}
          setSelectedChoices={setSelectedChoices}
        />
        <DayCard
          dayname={'Wednesday'}
          choices={createChoices()}
          selectedChoices={selectedChoices}
          setSelectedChoices={setSelectedChoices}
        />
        <DayCard
          dayname={'Thursday'}
          choices={createChoices()}
          selectedChoices={selectedChoices}
          setSelectedChoices={setSelectedChoices}
        />
        <DayCard
          dayname={'Friday'}
          choices={createChoices()}
          selectedChoices={selectedChoices}
          setSelectedChoices={setSelectedChoices}
        />
        <DayCard
          dayname={'Saturday'}
          choices={createChoices()}
          selectedChoices={selectedChoices}
          setSelectedChoices={setSelectedChoices}
        />
        <DayCard
          dayname={'Sunday'}
          choices={createChoices()}
          selectedChoices={selectedChoices}
          setSelectedChoices={setSelectedChoices}
        />
      </Card.Group>

      <Button className={'spacing-vertical'} primary onClick={handleSubmit}>
        Submit Menu Plan
      </Button>
    </>
  );
};

export default CreateMenuPlan;
