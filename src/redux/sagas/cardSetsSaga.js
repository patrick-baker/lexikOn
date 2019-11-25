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

// creates new card set, and adds it to the user's repertoire
function* postNewCardSet(action) {
    try {
        console.log('in postNewCardSet, card set name:', action.payload);
        yield axios.post(`/api/cardLists/newCardSet`, {setName: action.payload});
        yield put ({type: 'FETCH_USER_CARD_SETS'});
    } catch (error) {
        console.log('error posting new card set, error:', error);
    }
}

function* postAddExistingCardSet(action) {
    console.log('in postAddExistingCardSet, card set id', action.payload);
    yield axios.post(`/api/cardLists/addExistingCardSet`, {setId: action.payload});
    yield put ({type: 'FETCH_USER_CARD_SETS'});
    yield put ({type: 'FETCH_INVERSE_USER_CARD_SETS'});
}

function* removeUserCardSet (action) {
    console.log('in removeUserCardSet, card set id', action.payload);
    yield axios.delete(`/api/cardLists/removeCardSet/${action.payload}`);
    yield put ({type: 'FETCH_USER_CARD_SETS'});
    yield put ({type: 'FETCH_INVERSE_USER_CARD_SETS'});
}

function* updateUserCardSetName (action) {
    console.log('in updateUserCardSetName, payload:', action.payload);
    yield axios.put('/api/cardLists/updateCardSetName', action.payload);
    yield put ({type: 'FETCH_USER_CARD_SETS'});
    yield put ({type: 'FETCH_INVERSE_USER_CARD_SETS'});
}

function* cardSetsSaga() {
    yield takeLatest('FETCH_USER_CARD_SETS', fetchUserCardSets);
    yield takeLatest('FETCH_INVERSE_USER_CARD_SETS', fetchInverseUserCardSets);
    yield takeLatest('POST_NEW_CARD_SET', postNewCardSet);
    yield takeLatest('POST_ADD_EXISTING_CARD_SET_TO_REPERTOIRE', postAddExistingCardSet);
    yield takeLatest('REMOVE_CARD_SET_FROM_REPERTOIRE', removeUserCardSet)
    yield takeLatest('UPDATE_CARD_SET_NAME', updateUserCardSetName);
}

export default cardSetsSaga;
