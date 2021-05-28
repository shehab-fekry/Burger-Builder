import React from 'react';
import classes from './Burger.css';
import BurgerIngredinet from './BurgerIngredient/BurgerIngredient.js';

const Burger = (props) =>{
    let isEmpty = '';
    if(props.list.length === 0)
    {isEmpty = 'Please Add Some Ingredients!'}

    return(
        <div className={classes.Burger}>
            <BurgerIngredinet type={'bread-top'}/>
            {
                props.list.map((ingredient,index) =>{
                    return <BurgerIngredinet key={index} type={ingredient}/>
                })
            }
            {isEmpty}
            <BurgerIngredinet type={'bread-bottom'}/>
        </div>
    )
}

export default Burger;