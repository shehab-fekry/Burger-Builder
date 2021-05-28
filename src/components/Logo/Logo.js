import React from 'react';
import BurgerLogo from '../../assets/Images/burger-logo.png';
import classes from './Logo.css';

const Logo = () =>
{
    return(
        <div className={classes.Logo}>
            <img src={BurgerLogo} alt="BurgerLogo"/>
        </div>
    )
}

export default Logo;