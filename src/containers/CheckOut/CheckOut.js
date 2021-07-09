import React from 'react';
import { Component } from 'react';
import CheckoutSummery from '../../components/CheckoutSummery/CheckoutSummery';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as BurgerBuilderActions from '../../store/actions/burgerBuiderActions';
import Spinner from '../../components/UI/Spinner/Spinner';

class CheckOut extends Component
{
    checkoutCanceled = () =>{
        this.props.history.goBack();
        this.props.toResetAll();
    }

    checkoutContinued = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    
    render()
    {
        let summery = (
            <div style={{width:'100%'}}>
                <CheckoutSummery
                ingredients={this.props.ings}
                checkoutCanceled={this.checkoutCanceled}
                checkoutContinued={this.checkoutContinued}/>

                <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData}/>
            </div>
        )

        if(this.props.loading)
        summery = <Spinner/>

        if(this.props.error)
        summery = <div>Something Went Wrong...!</div> 

        return summery;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ings.ingredients,
        pr: state.ings.price,
        loading: state.order.loading,
        error: state.order.error,
    }
}

const mapdispatchToProps = (dispatch) => {
    return {
        toResetAll: () => dispatch(BurgerBuilderActions.resetAll()),
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(CheckOut);