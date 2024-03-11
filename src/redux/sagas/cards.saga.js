import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCards() {
    
    try {
        console.log('in fetchcards saga')
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          };
        const cardsResponse = yield axios.get('/api/inventory', config);
        yield put({
            type: 'SET_CARDS',
            payload: cardsResponse.data
        });
    } catch (err) {
        console.log('fetchCards error: ', err);
    }
}

function* cardsSaga() {
    yield takeLatest('FETCH_CARDS', fetchCards);
  }
  
  export default cardsSaga;