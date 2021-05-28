import React from 'react';
import classes from './BuildControl.css';

const BuildControl = (props) =>{
    return(
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.addition}>More</button>
            <button className={classes.More} disabled={props.controlState} onClick={props.deletion}>Less</button>
        </div>
    )
}

export default BuildControl;