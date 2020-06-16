import React from 'react';
import {
  useAsyncDispatch,
  useAsyncState,
  asyncFetch
} from '../../contexts/AsyncContext.jsx';

const AsyncDispatch = () => {
  const dispatch = useAsyncDispatch();
  const state = useAsyncState();
  const [number, setNumber] = React.useState(1);

  const fetchUser = () => {
    asyncFetch(
      dispatch,
      `https://jsonplaceholder.typicode.com/users/${number}`,
      {
        method: 'GET'
      }
    );
  };

  React.useEffect(() => {
    asyncFetch(dispatch, `https://jsonplaceholder.typicode.com/users/1`, {
      method: 'GET'
    });
  }, [dispatch]);

  return (
    <div>
      <input
        type='number'
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <button onClick={fetchUser}>Fetch User</button>
      {state.status === 'pending' && <p>Loading...</p>}
      {state.user && <p>{state.user.name}</p>}
      {state.error && <p>{state.error.message}</p>}
    </div>
  );
};

export default AsyncDispatch;
