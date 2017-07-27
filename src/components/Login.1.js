import React, { Component } from 'react';
import { connect } from 'react-redux';

import { doLogar,doUsuario,doSenha, doLogout,doLoginError } from '../actions/AppActions';
import {
    TextField,
    RaisedButton,
    Snackbar
} from 'material-ui';

import {
  Redirect
} from 'react-router-dom'

const logo = require('../img/logo.png');

class Login extends Component{
    constructor(props){
        super(props);
        this.props.doLogout();
        this._login = this._login.bind(this);
    }

    _login(){
        const {usuario,senha} = this.props;
        this.props.doLogar(usuario,senha);
    }
   
    render(){
        if(this.props.login){
            return(
                 <Redirect to={{
                    pathname: '/home',
                }}/>
            )
        }

        return(

            
            <div style={styles.main}>
                <div style={styles.contentLogo}> 
                    <img src={logo} style={styles.logo} />
                </div>
                <div styles={styles.formLogin} >
                    <TextField
                        value={this.props.usuario}
                        hintText="Digite seu usuário"
                        floatingLabelText="Usuário"
                        floatingLabelFixed={true}
                        fullWidth={true}
                        onChange={(str) => this.props.doUsuario(str)}
                    />

                    <TextField
                        value={this.props.senha}
                        hintText="Digite sua senha"
                        floatingLabelText="Senha"
                        floatingLabelFixed={true}
                        type="password"
                        fullWidth={true}
                        onChange={(str) => this.props.doSenha(str)}
                    />


                    <RaisedButton onClick={()=>this._login()}label="Entrar" primary={true}  />
                    <Snackbar
                        open={this.props.login_error}
                        message={this.props.login_msg}
                        autoHideDuration={4000}
                        onRequestClose={() => this.props.doLoginError()}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => { 
    return (
        {
            usuario: state.AppReducers.usuario,
            senha: state.AppReducers.senha,
            login: state.AppReducers.login,
            login_msg: state.AppReducers.login_msg,
            login_error:state.AppReducers.login_error,
        }
    )
}

export default connect(mapStateToProps, { doLogar, doUsuario,doSenha,doLogout,doLoginError })(Login);