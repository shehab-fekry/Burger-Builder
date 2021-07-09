import React from 'react';
import { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component{
    state=
    {
        orders: [],
    }

    componentDidMount()
    {
        axios.get('/orders.json')
        .then(response=>{
            let orders=[];
            for(let key in response.data)
            orders.push({
                ...response.data[key],
                id: key,
            })
            this.setState({orders: orders});
        })
        .catch(err=>err);
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order=>{
                    return <Order order={order} key={order.id} />
                })}
            </div>
        )
    }
}

export default Orders;