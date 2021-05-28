import React from 'react';
import { Component } from 'react';
import CheckoutSummery from '../../components/CheckoutSummery/CheckoutSummery';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';

class CheckOut extends Component
{
    state ={
        ingredients:[],
        price:0,
    }

    componentDidMount()
    {
        // GETTING THE INGREDIENTS FROM THE [SEARCH] IN OBJECT FORM:
        const ingQueryStr = this.props.location.search.slice(1,).slice(0,-10);

        const ingQueryObj = ingQueryStr.split('&').reduce((res, piece)=>{
            let [key, value] = piece.split('=');
            //if(key !== 'price')
            res[key] = +value;
            return res;
        },{});
        //console.log(ingQueryObj);


        // CONVERTING IT INTO ARRAY:
        let ingQueryArray = Object.keys(ingQueryObj).map(key =>{
            return Array(ingQueryObj[key]).fill(key);
        }).flat();
        //console.log(ingQueryArray);

        // SETTING THE PRICE & THE STATE:
        let priceString = this.props.location.search.slice(-9,);
        let [, value] = priceString.split('=');

        this.setState({ingredients: ingQueryArray, price: value});
    }

    checkoutCanceled = () =>{
        this.props.history.goBack();
    }

    checkoutContinued = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    
    render()
    {
        return(
            <div style={{width:'100%'}}>
                <CheckoutSummery
                ingredients={this.state.ingredients}
                checkoutCanceled={this.checkoutCanceled}
                checkoutContinued={this.checkoutContinued}/>

                <Route 
                path={this.props.match.path + '/contact-data'}
                render={()=> <ContactData price={this.state.price} ingredients={this.state.ingredients}/>}/>
            </div>
        )
    }
}

export default CheckOut;



// ANOTHER WAY OF SOLUTION:

        // let query = new URLSearchParams(this.props.location.search);

        // let ing = {};
        // for(let param of query.entries())
        // ing[param[0]] = param[1];

        // let ingArray = Object.keys(ing).map(key=>{
        //     return Array(ing[key]).fill(key);
        // }).flat();

        //GETTING THE PRICE:

        // let priceQueryStr = this.props.location.search.slice(16,);
        // let [price, value] = priceQueryStr.split('=');

        // this.setState({ingredients:ingArray, price: +value});