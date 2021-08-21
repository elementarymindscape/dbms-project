import * as ActionTypes from '../constants/productConstants';
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.GET_PRODUCTS_REQUEST });
        const {data} = await axios.post('http://localhost:3001/api/getAllProducts');

        dispatch({ 
            type: ActionTypes.GET_PRODUCTS_SUCCESS,
            payload: data
         })

      } catch (e) {
        dispatch({ 
            type: ActionTypes.GET_PRODUCTS_FAIL,
            payload: 
                error.response && error.response.data.message ? error.response.data.message : error.message
         })
      }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.GET_PRODUCT_DETAILS_REQUEST });
        const {data} = await axios.post(`http://localhost:3001/api/getProductById/${id}`);

        dispatch({ 
            type: ActionTypes.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data
         })

      } catch (e) { 
        dispatch({ 
            type: ActionTypes.GET_PRODUCTS_FAIL,
            payload: 
                error.response && error.response.data.message ? error.response.data.message : error.message
         })
      }
}

export const removeProductDetails = () => (dispatch) => {
    dispatch({
        type: ActionTypes.GET_PRODUCT_DETAILS_RESET
    });
}