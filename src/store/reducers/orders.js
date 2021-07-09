import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: [],
    loading: false,
    error: false,
}

const reducer = (state = initialState, action) => 
{
    switch(action.type)
    {
        case actionTypes.SENDING_ORDER_START:
            return {
                ...state.ingredients,
                loading: true,
            }
        case actionTypes.SENDING_ORDER_SUCCEED:
            return{
                ...state,
                loading: false,
            }
        case actionTypes.SENDING_ORDER_FAILED:
            return{
                ...state,
                loading: false,
                error: true,
            }
        default:
            return state;

    }
}

export default reducer;