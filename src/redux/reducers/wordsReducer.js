import { combineReducers } from 'redux';

// holds array of received words in chosen card set
const cardSetWordsReducer = (state = [], action) => {
    if (action.type === 'GET_CARD_SET_WORDS') {
        console.log('in cardSetWordsReducer,', action.payload);
        return action.payload;
    }
    return state;
}

// make one object that has keys cardSetWordsReducer,
// these will be on the redux state at:
// words.cardSetsWordsReducer,
export default combineReducers({
    cardSetWordsReducer,
});