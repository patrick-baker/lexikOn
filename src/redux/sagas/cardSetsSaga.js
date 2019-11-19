import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//fetches Users Card Sets from DB
function* fetchUserCardSets(action) {
    try {
        const receivedUserCardSets = yield axios.get(`/api/cardLists/userLists`);
        console.log('in fetchUserCardSets', receivedUserCardSets.data);
        yield put ({type: 'GET_USER_CARD_SETS', payload: receivedUserCardSets.data});
    } catch (error) {
        console.log('error fetching userCardSets', error);
    }
}

function* cardSetsSaga() {
    yield takeLatest('FETCH_USER_CARD_SETS', fetchUserCardSets);
}

export default cardSetsSaga;
