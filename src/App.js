import React, { Component } from 'react';
import Layout from './components/Layout/Layout.js';
import Aux from './hoc/Auxility';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut.js';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders'; 

class App extends Component {
  // state=
  // {
  //   show:true,
  // }
  
  // componentDidMount()
  // {
  //   setTimeout(()=>{
  //     this.setState({show:false});
  //   },5000)
  // }

  render(){
    return(
      <Aux>
        <Layout>
          <Switch>
            <Route path='/' exact component={BurgerBuilder}/>
            <Route path='/Orders' exact component={Orders}/>
            <Route path='/checkout' component={CheckOut}/>
          </Switch>
        </Layout>
      </Aux>
    )
  }
}

export default App;