import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const orderStart = () => ({ type: actionTypes.SENDING_ORDER_START })
export const orderSent = () => ({ type: actionTypes.SENDING_ORDER_SUCCEED })
export const orderFailed = () => ({ type: actionTypes.SENDING_ORDER_FAILED})

export const sendOrder = (order , history) => {
    return (dispatch) => {
        dispatch(orderStart());
        axios.post('/orders.json', order)
        .then(response => {
            dispatch(orderSent());
            history.push('/Orders')
        })
        .catch(err => {
            dispatch(orderFailed());
        });
    }
}