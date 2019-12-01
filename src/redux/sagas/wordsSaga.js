import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetches all words for chosen card set from server, to route /api/words/cardSet/set-id
function* fetchCardSetWordsSaga(action) {
    try {
        // runs the search through the server, with action.payload as the set-id
        console.log('in fetchCardSetWordsSaga, set id:', action.payload);
        const receivedWords = yield axios.get(`/api/words/cardSet/${action.payload}`);
        console.log(receivedWords);
        // sends the array of retrieved words to the cardSetWordsReducer in wordsReducer.js
        yield put({ type: 'GET_CARD_SET_WORDS', payload: receivedWords.data});
    } catch (error) {
        console.log('error fetching words', error);
    }
}

// deletes chosen word from current card set
function* removeWordFromSetSaga(action) {
    console.log('in removeWordFromSetSaga, entry to delete', action.payload);
    yield axios.delete(`/api/words/remove/${action.payload.wordInSetId}`);
    // retrieves updated card set words
    yield put({type: 'FETCH_CARD_SET_WORDS', payload: action.payload.setId});
}

function* wordsSaga() {
    yield takeLatest('FETCH_CARD_SET_WORDS', fetchCardSetWordsSaga);
    yield takeLatest('REMOVE_WORD_FROM_SET', removeWordFromSetSaga);
}

export default wordsSaga;
