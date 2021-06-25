import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import {withRouter} from 'react-router-dom';
import { Component } from 'react';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state=
    {
        formElemets:
        {
            name: {
                elementType: 'input',
                elementConfig:{
                    placeholder: 'Enter Your Name',
                    type: 'text',
                },
                validation:{
                    required: true,
                    maxLength: 5,
                    minLength: 5,
                },
                valid: false,
                touched:false,
                shouldValidate: true,
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig:{
                    placeholder: 'Street',
                    type: 'text',
                },
                validation:{
                    required: true,
                    maxLength: 5,
                    minLength: 5,
                },
                valid: false,
                touched:false,
                shouldValidate: true,
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    placeholder: 'ZibCode',
                    type: 'text',
                },
                validation:{
                    required: true,
                    maxLength: 5,
                    minLength: 5,
                },
                valid: false,
                touched:false,
                shouldValidate: true,
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    placeholder: 'Country',
                    type: 'text',
                },
                validation:{
                    required: true,
                    maxLength: 5,
                    minLength: 5,
                },
                valid: false,
                touched:false,
                shouldValidate: true,
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    placeholder: 'Enter Your email',
                    type: 'email',
                },
                validation:{
                    required: true,
                    maxLength: 5,
                    minLength: 5,
                },
                valid: false,
                touched:false,
                shouldValidate: true,
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheepest', displayValue: 'Cheepest'}
                ],
                validation: {
                    required: true
                },
                valid: false,
                shouldValidate: false,
                value: '',
            },
        },
        ingredients:{},
        price:0,
        formIsValid: false,
        loading:false,
    }

    componentDidMount()
    {
        const ingDataObject = this.props.ingredients.reduce((resault, element)=>{
            resault[element] = resault[element] ? resault[element]+1 : 1;
            return resault;
        },{});

        this.setState({
            price: this.props.price,
            ingredients: ingDataObject,
        });
    }

    orderHandler = (event) =>
    {
        event.preventDefault();

        let formData = {};
        for(let key in this.state.formElemets)
        formData[key] = this.state.formElemets[key].value;
        
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            formInfo: formData,
        };

        axios.post('/orders.json', order)
        .then(requist=>{
            this.props.history.replace('/orders');
        })
        .catch(err=> err);
    }

    // Checking Validation Rules:

    checkValidity = (value, validation) =>
    {
        let isValid1, isValid2, isValid3;
        isValid1 = isValid2 = isValid3 = true;

        if(validation.isRequired)
        isValid1 = value.trim() !== '';

        if(validation.minLength)
        isValid2 = value.length >= validation.minLength;

        if(validation.maxLength)
        isValid1 = value.length <= validation.maxLength;

        return isValid1 && isValid2 && isValid3;
    }

    // check the wholeform

    formIsValid = (updatedform) =>
    {
        // this was the main issue, (passing this.state.formElements  instead of updatedform).
        const {name, street, zipCode, country, email, deliveryMethod} = updatedform;
        return name.valid && 
        street.valid && 
        zipCode.valid && 
        country.valid && 
        email.valid 
        && deliveryMethod.valid;
    }

    onChangeListener = (event, key) =>
    {
        // deep cloning
        let toUpdateForm = {...this.state.formElemets};
        let toUpdateElement = {...toUpdateForm[key]};

        toUpdateElement.value = event.target.value;
        toUpdateElement.valid = this.checkValidity(toUpdateElement.value, toUpdateElement.validation);
        toUpdateElement.touched = true;
        toUpdateForm[key] = toUpdateElement;

        this.setState({formElemets: toUpdateForm, formIsValid: this.formIsValid(toUpdateForm)});
    }

    render(){
        const disabled = !this.state.formIsValid;

        let formElementsArray = [];
        for(let key in this.state.formElemets)
        formElementsArray.push({
            id: key,
            ...this.state.formElemets[key],
        });

        return(
            <div className={classes.ContactData}>
                <h3>Enter Your Contact Information</h3>
                <form onSubmit={this.orderHandler}>
                    {
                    formElementsArray.map(formElemet =>{
                        return <Input
                        key={formElemet.id} 
                        elementType={formElemet.elementType} 
                        elementConfig={formElemet.elementConfig} 
                        value={formElemet.value}
                        invalid={(!formElemet.valid)}
                        touched={formElemet.touched}
                        shouldV={formElemet.shouldValidate}
                        changed={(event)=> this.onChangeListener(event, formElemet.id)}/>
                    })
                    }
                    <Button disabled={disabled} btnType='Success'>Order</Button>
                </form>
            </div>
        )
    }
}

export default withRouter(ContactData);