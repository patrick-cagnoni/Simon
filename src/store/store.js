import { createStore, combineReducers } from 'redux';
import mainReducer from './reducers/mainReducer';
import transactionsReducer from './reducers/transactionsReducer';
import dateSliderReducer from './reducers/dateSliderReducer';
import modalReducer from '../store/reducers/modalReducer';

const allReducers = combineReducers({main: mainReducer, transactions: transactionsReducer, dateSlider: dateSliderReducer, modal: modalReducer});

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;