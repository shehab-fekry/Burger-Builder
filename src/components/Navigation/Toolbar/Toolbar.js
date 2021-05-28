import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../../UI/DrawerToggle/DrawerToggle';

const Toolbar = (props) =>
{
    return(
        <div className={classes.Toolbar}>
            <ToggleButton clicked={props.clicked}><strong>Toggle</strong></ToggleButton>
            <Logo/>
            <NavigationItems/>
        </div>
    )
}

export default Toolbar;