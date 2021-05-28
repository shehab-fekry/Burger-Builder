import React from 'react';
import Aux from '../../../hoc/Auxility';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const NavigationItems = () =>
{
    return(
        <Aux>
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/">BurgerBuilder</NavigationItem>
                <NavigationItem link="/Orders">Orders</NavigationItem>
            </ul>
        </Aux>
    )
}

export default NavigationItems;