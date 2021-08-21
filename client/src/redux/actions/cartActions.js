import * as ActionTypes from '../constants/cartConstants';
import axios from 'axios';


export const addToCart = (id, qty) => async(dispatch, getState) => {
    const {data} = await axios.post('http://localhost:3001/api/getAllProducts');

    dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: {
            product: data._id,
            name: data.name,
            imageUrl: data.imageUrl,
            price: data.price,
            qty
        },
    });

    localStorage.getItem("cart", JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.REMOVE_FROM_CART,
        payload: id
    })
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))
}
