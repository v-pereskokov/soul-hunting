import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';


const data = (state = {egor: 'Привет'}, action) => {
    return state;
};

const reducer = combineReducers({
    data
});

const store = createStore(
    reducer
);

export default store;