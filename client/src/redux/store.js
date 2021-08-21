import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';

//REDUCERS
import { cartReducer } from './reducers/cartReducers';
import { getProductDetailsReducer, getProductReducer } from './reducers/productReducers';
import { userReducer } from './reducers/userReducer';


const reducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    getProducts: getProductReducer,
    getProductDetails: getProductDetailsReducer,
});

const middleware = [thunk];

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;