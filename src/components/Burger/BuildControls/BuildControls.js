import React from 'react';
import BuildControl from './BuildControl/BuildControl.js';
import classes from './BuildControls.css';

const Controls = [
    {label:"salad", type:"salad"},
    {label:"bacon", type:"bacon"},
    {label:"cheese", type:"cheese"},
    {label:"meat", type:"meat"},
];

const BuildControls = (props) =>{
    return(
        <div className={classes.BuildControls}>
            <div>Current Price: <strong>{Math.abs(props.price.toFixed(1))}$</strong></div>
            {
            Controls.map((object)=>{
                return <BuildControl 
                label={object.label} 
                key={object.label}
                addition={()=>props.add(object.type)}
                deletion={()=>props.delete(object.type)}
                controlState={props.controlState}/>
            })
            } 
            <button 
            className={classes.OrderButton}
            disabled={props.controlState}
            onClick={props.orderButtonState}>Order Now</button>
        </div>
    )
}

export default BuildControls;