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

function* addCard(action){
    try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        const response = yield axios.post("/api/inventory", action.payload, config);
        console.log(action.payload)
        yield put({ type: "FETCH_CARDS" });
      } catch (error) {
        console.log("User post request failed", error);
      }
}

function* cardsSaga() {
    yield takeLatest('FETCH_CARDS', fetchCards);
    yield takeLatest('ADD_CARD', addCard)
  }
  
  export default cardsSaga;