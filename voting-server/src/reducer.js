import {setEntries, next, restart, vote, strike, INITIAL_STATE} from './core';

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_ENTRIES':
    return setEntries(state, action.entries);
  case 'NEXT':
    return next(state);
  case 'RESTART':
    return restart(state);
  case 'VOTE':
    return state.update('vote', voteState => vote(voteState, action.entry, action.clientId));
  case 'STRIKE':
    return strike(state, action.entry);
  }
  return state;
}
