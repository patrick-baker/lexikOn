import { combineReducers } from 'redux';

// holds array of received objects holding image information from Unslpashed API
// const imagesReducer = (state = [], action) => {
//     if (action.type === 'GET_IMAGES') {
//         console.log('in imagesReducer, length of imagesReducer array', action.payload.length);
//         return action.payload;
//     }
//     return state;
// }

// make one object that has keys imagesReducer, translationReducer, translateFromReducer
// these will be on the redux state at:
// state.newWord.imagesReducer and state.newWord.translationReducer, state.newWord.translateFromReducer
// export default combineReducers({
//   imagesReducer,
//   translationReducer,
//   translateFromReducer
// });