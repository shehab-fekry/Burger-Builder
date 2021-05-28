import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxility';

const SideDrawer = (props) =>
{
    return(
        <Aux>
            <Backdrop 
            active={props.active}
            clicked={props.clicked}/>
            
            <div 
            className={classes.SideDrawer}
            style=
            {{
                transform: props.active ? 'translateX(0)' : 'translateX(-100vh)',
                opacity: props.active ? '1' : '0',
            }}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>

                <nav>
                    <NavigationItem link="/">BurgerBuilder</NavigationItem>
                    <NavigationItem link="/orders">Orders</NavigationItem>
                </nav>
            </div>
        </Aux>    
    )
}

export default SideDrawer;