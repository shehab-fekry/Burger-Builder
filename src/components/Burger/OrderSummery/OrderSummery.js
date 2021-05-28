import React from 'react';
import Aux from '../../../hoc/Auxility';
import Button from '../../UI/Button/Button';

const OrderSummery = (props) =>{
    const ingrediants = [...props.ingredient];
    let S,B,C,M;
        S = B = C = M = 0;

    for(let i=0; i<ingrediants.length; i++)
    {
        switch(ingrediants[i])
        {
            case "salad":
                S +=1;
                break;
            case "bacon":
                B +=1;
                break;
            case "cheese":
                C +=1;
                break;
            case "meat":
                M +=1;
                break;
            default:
                break;
        }
    }
    
    const IngNameQuantity =[
        {name:"Salad",  quantity:S },
        {name:"Bacon",  quantity:B },
        {name:"Cheese", quantity:C },
        {name:"Meat",   quantity:M },
    ];

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delecious burger with the following ingrediants:</p>
            <ul>
            {
                IngNameQuantity.map((ingrediant,indx)=>{
                    return(
                        <li key={indx}>
                            {ingrediant.name}: {ingrediant.quantity}
                        </li>
                    )
                })
            } 
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}$</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.hideModal} btnType='Danger'>Cancel</Button>
            <Button clicked={props.checkout}  btnType='Success'>Continue</Button>
        </Aux>
    )
}

export default OrderSummery;