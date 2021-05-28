import React from 'react';
import classes from './Order.css';

const Order = (props) => {
    let order = props.order;
    let ingArray=[];

    for(let ing in order.ingredients)
    ingArray.push(ing + '=' + order.ingredients[ing])

        return(
            <div className={classes.Order}>
                <p>Ingredients: 
                    {
                    ingArray.map(ingV=>{
                    let [ing, value] = ingV.split('=');
                    return <span>{ing} ({value})</span>
                    })
                    } 
                </p>
                <p>Price: <strong>${order.price} USD</strong></p>
            </div>
        )
}

export default Order;