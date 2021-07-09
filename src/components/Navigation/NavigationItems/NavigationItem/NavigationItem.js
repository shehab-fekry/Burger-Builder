import React from 'react';
import Aux from '../../../../hoc/Auxility';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';


const NavigationItem = (props) =>
{
    return(
        <Aux>
            <li className={classes.NavigationItem}>
                <NavLink activeClassName={classes.active} exact to={{pathname:props.link}}>{props.children}</NavLink>
            </li>
        </Aux>
    )
}

export default NavigationItem;