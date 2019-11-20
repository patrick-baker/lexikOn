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

// fetches all card sets that the user does not have in their repertoire
function* fetchInverseUserCardSets(action) {
    try {
        const receivedInverseUserCardSets = yield axios.get(`/api/cardLists/inverseUserLists`);
        console.log('in fetchInverseUserCardSets', receivedInverseUserCardSets.data);
        yield put ({type: 'GET_INVERSE_USER_CARD_SETS', payload: receivedInverseUserCardSets.data})
    } catch (error) {
        console.log('error fetching inverseUserCardSets', error);
    }
}

function* cardSetsSaga() {
    yield takeLatest('FETCH_USER_CARD_SETS', fetchUserCardSets);
    yield takeLatest('FETCH_INVERSE_USER_CARD_SETS', fetchInverseUserCardSets);
}

export default cardSetsSaga;
