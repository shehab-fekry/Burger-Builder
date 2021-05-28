import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxility';
import { Component } from 'react';

class Modal extends Component
{
    componentDidUpdate()
    {
        //console.log('[Modal] is updating');
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        return (nextProps.active !== this.props.active || nextProps.children !== this.props.children);
    }

    render()
    {
        return(
        <Aux>
            <Backdrop 
            active={this.props.active}
            clicked={this.props.clicked}/>

            <div className={classes.Modal}
            style=
            {{
                transform: this.props.active ? 'translateY(0)' : 'translateY(-100vh)', 
                opacity: this.props.active ? '1' : '0',
            }}>
                
                {this.props.children}
            </div>
        </Aux>
        )
    }
}

export default Modal;