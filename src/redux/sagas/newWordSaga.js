import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetches searched image information from Unsplash API
function* fetchImageSaga(action) {
    try {
        // runs the search through the server, with action.payload as the searched word
        console.log(action.payload);
        const receivedImages = yield axios.get(`/api/image/${action.payload}`);
        console.log(receivedImages.data.hits);
        // sends the array of retrieved images to the imagesReducer in newWordReducer.js
        yield put({ type: 'GET_IMAGES', payload: receivedImages.data.hits });
    } catch (error) {
        console.log('error fetching image', error);
    }
}

// fetches translation of searched word from Yandex translation API 
// first req.param is the from-to relation of the translation
function* fetchTranslationSaga(action) {
    try {
        // runs search through the server, with action.payload as the searched word
        const receivedTranslation = yield axios.get(`/api/translate/en-ru/${action.payload}`);
        console.log(receivedTranslation);
        // sends the retrieved translation word to the translationReducer in newWordReducer.js
        yield put({ type: 'GET_TRANSLATION', payload: receivedTranslation.data.text[0]});
        // sends the original searched word to the translateFromReducer in newWordReducer.js
        yield put({ type: 'TRANSLATE_FROM', payload: action.payload})
    } catch (error) {
        console.log('error fetching translation', error);
    }
}

// called from AddWord component if word does not already exist in DB
function* addNewWordToSetSaga(action) {
    try {
        console.log('in addNewWordToSetSaga, action.payload:', action.payload);
        yield axios.post(`/api/addWord/newWord`, action.payload);
    } 
    catch (error) {
        console.log('error posting new word in addNewWordToSetSaga, error:', error);
    }
}

function* addExistingWordToSetSaga(action) {
    try {
        console.log('in addExistingWordToSetSaga, action.payload:', action.payload);
        yield axios.post('api/addWord/existingWord', action.payload);
    }
    catch (error) {
        console.log('error posting existing word in addExistingWordToSetSaga, error:', error);
    }
}

function* newWordSaga() {
    yield takeLatest('FETCH_TRANSLATION', fetchTranslationSaga);
    yield takeLatest('FETCH_IMAGE', fetchImageSaga);
    yield takeLatest('ADD_NEW_WORD_TO_SET', addNewWordToSetSaga);
    yield takeLatest('ADD_EXISTING_WORD_TO_SET', addExistingWordToSetSaga);
}

export default newWordSaga;
