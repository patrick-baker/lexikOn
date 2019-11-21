import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetches all words for chosen card set from server, to route /api/words/cardSet/set-id
function* fetchCardSetWordsSaga(action) {
    try {
        // runs the search through the server, with action.payload as the set-id
        console.log(action.payload);
        const receivedWords = yield axios.get(`/api/words/cardSet/${action.payload}`);
        console.log(receivedWords);
        // sends the array of retrieved words to the cardSetWordsReducer in wordsReducer.js
        yield put({ type: 'GET_CARD_SET_WORDS', payload: receivedWords.data});
    } catch (error) {
        console.log('error fetching words', error);
    }
}

function* wordsSaga() {
    yield takeLatest('FETCH_CARD_SET_WORDS', fetchCardSetWordsSaga);
}

export default wordsSaga;
