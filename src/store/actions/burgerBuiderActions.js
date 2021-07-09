import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingtype) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingType: ingtype,
    }
}

export const removeIngredient = (ingtype) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingType: ingtype,
    }
}

export const resetAll = () => {
    return {
        type: actionTypes.RESET_ALL,
    }
}


// Sync
const setIngredient = (data) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: data,
    }
}

// Async
export const initIngredient = () => {
    return (dispatch) => {
        axios.get('/ingredients.json')
        .then(response=>{
            let dataFetched=[];
            dataFetched = Object.keys(response.data).map(key=>{
                return Array(response.data[key]).fill(key);
                //Alternative for Flat: 
                //.reduce((acc, val) => acc.concat(val), []);
            });
            dispatch(resetAll());
            dispatch(setIngredient(dataFetched.flat()));
        })
        .catch(error=>{
            dispatch({type: actionTypes.FETCH_INGREDIENT_FAILED});
        });
    }
}