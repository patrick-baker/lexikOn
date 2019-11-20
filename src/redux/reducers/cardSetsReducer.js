import { combineReducers } from 'redux';

// holds the card sets that the current user has in their collection
const userCardSetsReducer = (state=[], action) => {
    if (action.type === 'GET_USER_CARD_SETS') {
        return action.payload;
    }
    return state;
}

// holds the card sets that the current user does not have in their collection
const inverseUserCardSetsReducer = (state=[], action) => {
    if (action.type === 'GET_INVERSE_USER_CARD_SETS') {
        return action.payload;
    }
    return state;
}

// make one object that has keys userCardSetsReducer,
// these will be on the redux state at:
// state.cardSets.userCardSetsReducer
export default combineReducers({
  userCardSetsReducer,
  inverseUserCardSetsReducer,
});