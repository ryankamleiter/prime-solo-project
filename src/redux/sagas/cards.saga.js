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

function* editCard(action){
  try {
      const { card_id } = action.payload;
      console.log(card_id)
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const response = yield axios.put(`/api/inventory/${card_id}`, action.payload, config);
      console.log('action.payload: ', action.payload)
      yield put({ type: "FETCH_CARDS" });
    } catch (error) {
      console.log("User put request failed", error);
    }
}

function* deleteCard(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.delete(`/api/inventory/${action.payload}`, config);
    yield put({ type: "FETCH_CARDS" });
  } catch (error) {
    console.log("Delete attempt failed", error);
  }
}

function* cardsSaga() {
    yield takeLatest('FETCH_CARDS', fetchCards);
    yield takeLatest('ADD_CARD', addCard);
    // yield takeLatest('EDIT_CARD', editCard);
    yield takeLatest('DELETE_CARD', deleteCard);
  }
  
  export default cardsSaga;
