import * as actionTypes from '../actions/actionTypes';

let initialState = {
    ingredients:[],
    orderButtonAuth: true,
    price: 0,
    error: false,
}

const reducer = (state = initialState, action) => {
    let ings = [...state.ingredients];
    let auth;
    let pr = state.price;
    switch (action.type)
    {
        case actionTypes.ADD_INGREDIENT:
            ings.push(action.ingType);

            if(ings.length !== 0)
            auth = false;

            switch(action.ingType){
                case "salad":
                    pr += 0.4;
                    break;
                case "bacon":
                    pr += 0.3;
                    break;
                case "cheese":
                    pr += 0.5;
                    break;
                case "meat":
                    pr += 1.0;
                    break;
                default:
                    break;
            }

            return {
                ...state,
                ingredients: ings,
                orderButtonAuth: auth,
                price: pr,
            }
        case actionTypes.REMOVE_INGREDIENT:
            for (let i=0; i< ings.length; i++)
            {
                if(ings[i] === action.ingType)
                {
                    ings.splice(i,1);
                    break;
                }
            }

            if(ings.length === 0)
            auth = true;

            switch(action.ingType){
                case "salad":
                    pr -= 0.4;
                    break;
                case "bacon":
                    pr -= 0.3;
                    break;
                case "cheese":
                    pr -= 0.5;
                    break;
                case "meat":
                    pr -= 1.0;
                    break;
                default:
                    break;
            }

            return {
                ...state,
                ingredients: ings,
                orderButtonAuth: auth,
                price: pr,
            }

            case actionTypes.SET_INGREDIENT:
                return {
                    ...state,
                    ingredients: action.ingredients,
                    error: false,
                }

            case actionTypes.FETCH_INGREDIENT_FAILED:
                return {
                    ...state,
                    error: true,
                }
                
            case actionTypes.RESET_ALL:
                return {
                    ...state,
                    price: 0,
                    orderButtonAuth: true,
                    ingredients: [],
                } 
        default:
            return state;
    }
}

export default reducer;