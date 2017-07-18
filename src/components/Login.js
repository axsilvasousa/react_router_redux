import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogar,doUsuario,doSenha } from '../actions/AppActions';
import {
    TextField,
    RaisedButton
} from 'material-ui';


class Login extends Component{
    constructor(props){
        super(props);
        this._login = this._login.bind(this);
    }
    _login(){
        const {usuario,senha} = this.props;
        this.props.doLogar(usuario,senha);
    }

    render(){
        return(
            <div>
               Login
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
            </div>
        )
    }
}

const mapStateToProps = state => { 
    return (
        {
            usuario: state.AppReducers.usuario,
            senha: state.AppReducers.senha,
        }
    )
}

export default connect(mapStateToProps, { doLogar, doUsuario,doSenha })(Login);