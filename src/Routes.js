import React,{Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import {
  CheckToken
} from './utils/Repository';
import {
  BASE
} from './Constants';
import Home from './components/Home';
import Login from './components/Login';
import Pedidos from './components/Pedidos';
import Lista from './components/Lista';

class  Rotas extends Component {
  
  render(){
    return (
      <Router>
        <div>
          <Route exact path={BASE+"/"} component={Login}/>
          <PrivateRoute exact path={BASE+"/home"} component={Home} />          
          <PrivateRoute exact path={BASE+"/pedidos"} component={Pedidos} />
          <PrivateRoute path={BASE+"/pedidos/:loja"} component={Pedidos} />
          <PrivateRoute exact path={BASE+"/lista"} component={Lista} />
          <PrivateRoute path={BASE+"/lista/:lista"} component={Lista} />
        </div>
      </Router>
    )
  }  
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      CheckToken() ? (
          <Component {...props} />
      ) : <div>no logado</div>
  )}/>
)

export default Rotas;