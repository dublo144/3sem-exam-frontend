import React from 'react';
import { apiUtils } from '../utils/apiUtils';

const AsyncStateContext = React.createContext();
const AsyncDispatchContext = React.createContext();

const status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
};

const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH':
      return { status: status.PENDING };
    case 'FETCH_SUCCESS':
      return { ...state, status: status.RESOLVED, payload: action.res };
    case 'FETCH_FAILED':
      return { ...state, status: status.REJECTED, error: action.error };
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const asyncFetch = async (dispatch, url, _payload = null) => {
  dispatch({ type: 'FETCH' });
  try {
    const opts = apiUtils.makeOptions(
      _payload.method,
      _payload.body,
      _payload.token
    );
    const res = await apiUtils.fetchData(url, opts);
    dispatch({ type: 'FETCH_SUCCESS', res });
  } catch (error) {
    dispatch({ type: 'FETCH_FAILED', error });
  }
};

const AsyncProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(asyncReducer, {});
  return (
    <AsyncStateContext.Provider value={state}>
      <AsyncDispatchContext.Provider value={dispatch}>
        {children}
      </AsyncDispatchContext.Provider>
    </AsyncStateContext.Provider>
  );
};

const useAsyncState = () => {
  const context = React.useContext(AsyncStateContext);
  if (context === undefined) {
    throw new Error('useAsyncState must be used within a AsyncProvider');
  }
  return context;
};

const useAsyncDispatch = () => {
  const context = React.useContext(AsyncDispatchContext);
  if (context === undefined) {
    throw new Error('useAsyncDispatch must be used within a AsyncProvider');
  }
  return context;
};

export { AsyncProvider, useAsyncState, useAsyncDispatch, asyncFetch };
