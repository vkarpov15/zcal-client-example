import { createStore } from 'redux';
import UserDataType from './types/UserData';

const SERVER = 'http://localhost:9000';

// initial state

const initialState = {
  userData: {
    events: []
  },
  loading: true,
  error: null
}

// action types

export const actionTypes = {
  USER_FETCH_START: 'USER_FETCH_START',
  USER_FETCH_END: 'USER_FETCH_END',
  USER_FETCH_ERROR: 'USER_FETCH_ERROR'
};

// reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_FETCH_START:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case actionTypes.USER_FETCH_END:
      return Object.assign({}, state, {
        loading: false,
        userData: action.payload,
        error: null
      });
    case actionTypes.USER_FETCH_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });
    default:
      return state;
  }
};

// action creator

export const fetchUserData = async function(id) {
  store.dispatch({ type: actionTypes.USER_FETCH_START });

  let payload;
  try {
    const res = await fetch(`${SERVER}/user/${id}`);
    payload = await res.json();
    if (res.status !== 200) {
      throw new Error(payload.message || 'Unknown error');
    }
    payload = new UserDataType(payload);
  } catch (error) {
    return store.dispatch({
      type: actionTypes.USER_FETCH_ERROR,
      payload: error
    });
  }

  store.dispatch({ type: actionTypes.USER_FETCH_END, payload });
};

export const store = createStore(reducer, initialState);
