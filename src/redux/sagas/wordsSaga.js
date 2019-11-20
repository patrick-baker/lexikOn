import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetches searched image information from Unsplash API
// function* fetchImageSaga(action) {
//     try {
//         // runs the search through the server, with action.payload as the searched word
//         console.log(action.payload);
//         const receivedImages = yield axios.get(`/api/image/${action.payload}`);
//         console.log(receivedImages.data.hits);
//         // sends the array of retrieved images to the imagesReducer in newWordReducer.js
//         yield put({ type: 'GET_IMAGES', payload: receivedImages.data.hits });
//     } catch (error) {
//         console.log('error fetching image', error);
//     }
// }

function* newWordSaga() {
//     yield takeLatest('FETCH_TRANSLATION', fetchTranslationSaga);
//     yield takeLatest('FETCH_IMAGE', fetchImageSaga);
//     yield takeLatest('ADD_NEW_WORD_TO_SET', addNewWordToSetSaga);
}

export default wordsSaga;
