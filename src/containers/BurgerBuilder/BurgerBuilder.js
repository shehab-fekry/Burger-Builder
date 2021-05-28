import React, { Component } from 'react';
import Aux from '../../hoc/Auxility';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
//import proptypes from 'prop-types';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErorHandler from '../../hoc/withErrorHandler';

class BurgerBuilder extends Component{
    state ={
        ingredients:[],
        price: 0,
        authorization: true,
        modalState: false,
        loading:false,
        error:false,
    }

    componentDidMount()
    {
        
        //console.log(this.props);
        axios.get('/ingredients.json')
        .then(response=>{
            let dataFetched=[];
            dataFetched = Object.keys(response.data).map(key=>{
                return Array(response.data[key]).fill(key);
                //Alternative for Flat: 
                //.reduce((acc, val) => acc.concat(val), []);
            });
            this.setState({ingredients: dataFetched.flat()});
        })
        .catch(error=>{
            this.setState({error:error});
        });
    }

    showModal = () =>{
        this.setState({modalState: true});
    }

    hideModal = () =>{
        this.setState({modalState: false});
    }

    checkout = () =>{
        let ingredients = [...this.state.ingredients];

        const ingData = ingredients.reduce((resault, element)=>{
            resault[element] = resault[element] ? resault[element]+1 : 1;
            return resault;
        },{});
        
        const queryParams= [];
        for(let key in ingData)
        queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(ingData[key]));
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname:'/checkout',
            search: queryString + '&price=' + this.state.price.toFixed(1),
        });
    }

    updateButtonState = (ing) =>
    {
        let auth;
        if(ing.length === 0)
        {auth = true}
        else
        {auth = false}

        this.setState({authorization: auth});
    }

    addIngredient = (type) => {
        const ingredients = [...this.state.ingredients];
        ingredients.push(type);

        let pr = this.state.price;
            switch(type){
                case "salad":
                    pr += 0.4;
                    break;
                case "bacon":
                    pr += 0.3;
                    break;
                case "cheese":
                    pr += 0.5;
                    break;
                case "meat":
                    pr += 1.0;
                    break;
                default:
                    break;
            }

        this.setState({
            ingredients: ingredients,
            price: pr,
        })
        this.updateButtonState(ingredients);
    }

    deleteIngredient = (type) => {
        const ingredients = [...this.state.ingredients];
        let pr = this.state.price;
        for(let i=0 ; i<ingredients.length; i++)
        {
            if(ingredients[i] === type)
            {
                ingredients.splice(i,1);
                switch(type){
                    case "salad":
                        pr -= 0.4;
                        break;
                    case "bacon":
                        pr -= 0.3;
                        break;
                    case "cheese":
                        pr -= 0.5;
                        break;
                    case "meat":
                        pr -= 1.0;
                        break;
                    default:
                        break;
                }
                break;
            }
        }
            

        this.setState({
            ingredients: ingredients,
            price: pr,
        })
        this.updateButtonState(ingredients);
    }

    render(){
        let orderSummery = null;
        let burger = this.state.error ? <p>Somthing went wrong...!</p> : <Spinner/>;
        if(this.state.ingredients)
        {
            burger =(
                <Aux>
                    <Burger list={this.state.ingredients}/>
                
                    <BuildControls 
                    add={this.addIngredient}
                    delete={this.deleteIngredient}
                    price={this.state.price}
                    controlState={this.state.authorization}
                    orderButtonState={this.showModal}/>
                </Aux>
            );

            orderSummery =(
                <OrderSummery 
                    ingredient={this.state.ingredients}
                    hideModal={this.hideModal}
                    checkout={this.checkout}
                    price={this.state.price}/>
            );
            if(this.state.loading)
            orderSummery = (<Spinner/>);
        }

        return(
        <Aux>
            <Modal 
            active={this.state.modalState}
            clicked={this.hideModal}>
                {orderSummery}
            </Modal>
            {burger}
        </Aux>
        )
    }
}

export default withErorHandler(BurgerBuilder,axios);