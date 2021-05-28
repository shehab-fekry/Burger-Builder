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

    // Checking Validation Methods:

    // isRequired = (value) => {
    //     return value.trim() !== "";
    // }

    // checkMin = (value, validation) => {
    //     return value.length >= validation.minLength;
    // }

    // checkMax = (value, validation) => {
    //     return value.length <= validation.maxLength;
    // }

    // Main Checking Method:

    checkValidity = (value, validation) =>
    {
        const {required, minLength, maxLength} = validation
        
        const funcs = {
            required: () => value.trim() !== "",
            minLength: () => value.length >= minLength,
            maxLength: () => value.length <= maxLength
        }
        
        let valid = true
        for(let key in validation) {
            valid = funcs[key]()
            if (!valid) break
        }
        return valid

        // return this.isRequired(value, required) && 
        // this.checkMin(value, minLength) 
        // && this.checkMax(value, maxLength);
    }

    // check the wholeform

    formIsValid = () =>
    {
        const {name, street, zipCode, country, email, deliveryMethod} = this.state.formElemets
        return name.valid && 
        street.valid && 
        zipCode.valid && 
        country.valid && 
        email.valid 
        && deliveryMethod.valid;
    }

    onChangeListener = (event, key) =>
    {
        // let toUpdateForm = {...this.state.formElemets};
        // let toUpdateElement = {...toUpdateForm[key]};

        // toUpdateElement.value = event.target.value;
        // toUpdateElement.valid = this.checkValidity(toUpdateElement.value, toUpdateElement.validation);
        // toUpdateElement.touched = true;
        // toUpdateForm[key] = toUpdateElement;

        const {value='', validation={}} = this.state.formElemets[key]

        const updates = {
            ...this.state.formElemets[key],
            value: event.target.value,
            valid: this.checkValidity(event.target.value, validation),
            touched: true,
        }

        // let formIsV = this.formIsValid();
        // console.log(this.formIsValid());

        this.setState({formElemets: {...this.state.formElemets, [key]: updates}, formIsValid: this.formIsValid()});
    }

    render(){
        let formElementsArray = [];
        for(let key in this.state.formElemets)
        formElementsArray.push({
            id: key,
            ...this.state.formElemets[key],
        });
        const disabled = !this.state.formIsValid
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