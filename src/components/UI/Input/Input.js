import React from 'react';
import classes from './Input.css';

const Input = (props) =>
{
    let InputElement = null;
    let styles = [classes.InputElement];

    if(props.invalid && props.touched && props.shouldV)
    styles.push(classes.Invalid);

    switch(props.elementType)
    {
        case ('input'):
            InputElement = <input 
            className={styles.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>;
            break;
        case ('select'):
            InputElement = (
                <select
                className={styles.join(' ')}
                onChange={props.changed}>
                    <optgroup label="Delivery Method">
                    {
                    props.elementConfig.map(option =>{
                        return <option key={option.value} value={option.value}>{option.displayValue}</option>
                    })
                    }
                    </optgroup>
                </select>
            )
            break;
        case ('textarea'):
            InputElement = <textarea className={classes.InputElement} />;
            break;
        default:
            InputElement = <input 
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>;
            break;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {InputElement}
        </div>
    )
}

export default Input; 