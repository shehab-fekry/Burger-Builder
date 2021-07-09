import React, { Component } from 'react';
import Aux from '../../hoc/Auxility';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErorHandler from '../../hoc/withErrorHandler';
import { connect } from 'react-redux';
import * as BurgerBuilderActions from '../../store/actions/burgerBuiderActions';
class BurgerBuilder extends Component{
    state = {
        modalState: false,
    }

    componentDidMount()
    {
        this.props.toSetIngs();
    }

    showModal = () =>{
        this.setState({modalState: true});
    }

    hideModal = () =>{
        this.setState({modalState: false});
    }

    checkout = () =>{
        this.props.history.push({
            pathname:'/checkout',
            //search: queryString + '&price=' + this.state.price.toFixed(1),
        });
    }

    render(){
        let orderSummery = null;
        let burger = this.props.error ? <p>Somthing went wrong...!</p> : <Spinner/>;

        if(this.props.ings)
        {
            burger =(
                <Aux>
                    <Burger list={this.props.ings}/>
                    <BuildControls 
                    add={this.props.toAddIngs}
                    delete={this.props.toRemoveIngs}
                    price={this.props.pr}
                    controlState={this.props.buttonAuth}
                    orderButtonState={this.showModal}/>
                </Aux>
            );

            orderSummery =(
                <OrderSummery 
                    ingredient={this.props.ings}
                    hideModal={this.hideModal}
                    checkout={this.checkout}
                    price={this.props.pr}/>
            );
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

const mapStateToProps = (state) => {
    return {
        ings: state.ings.ingredients,
        buttonAuth: state.ings.orderButtonAuth,
        pr: state.ings.price,
        error: state.ings.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toAddIngs: (ingtype) => dispatch(BurgerBuilderActions.addIngredient(ingtype)),
        toRemoveIngs: (ingtype) => dispatch(BurgerBuilderActions.removeIngredient(ingtype)),
        toSetIngs: () => dispatch(BurgerBuilderActions.initIngredient()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErorHandler(BurgerBuilder,axios));