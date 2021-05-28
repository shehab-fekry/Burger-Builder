import React from 'react';
import Aux from '../../hoc/Auxility';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { Component } from 'react';

class Layout extends Component
{
    state =
    {
        sideDrawerState: false,
    }

    showSideDrawer = () =>{
        this.setState({sideDrawerState: true});
    }

    hideSideDrawer = () =>{
        this.setState({sideDrawerState: false});
    }

    render()
    {
        return(
            <Aux>
                <SideDrawer 
                active={this.state.sideDrawerState}
                clicked={this.hideSideDrawer}/>

                <Toolbar clicked={this.showSideDrawer}/>

                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} 

export default Layout;