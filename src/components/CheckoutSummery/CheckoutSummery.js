import React from 'react';
import { Component } from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummery.css';


class CheckoutSummery extends Component
{
    render()
    {
        return(
            <div className={classes.checkoutSummery}>
                <h1>We hope it taste good!</h1>
                <Burger list={this.props.ingredients}/>
                <Button btnType="Danger" clicked={this.props.checkoutCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.checkoutContinued}>CONTINUE</Button>
            </div>
        )
    }
}

export default CheckoutSummery;