import axios from 'axios';
import _ from 'lodash';
import {
    HOST,
    USER_UP,
    SENHA_UP,
    PEDIDOS_ADD,
    PEDIDOS_LISTAR,
    PEDIDOS_ITEM_SELECIONADO,
    URL_LOGIN,
    URL_PEDIDOS,
    QUANTIDADE_UP,
    SEARCH_TEXT_UP,
    LOJA,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    LOGIN_ERRO_RESET,
    LIST_PRODUTOS,
    PRODUTOS_ERROR
} from '../Constants';

import {
    getToken, 
    setLogin,
} from '../utils/Repository';

export const doUsuario = input => {
    return {
        type: USER_UP,
        payload: input.target.value
    }
}

export const doSenha = input => {
    return {
        type: SENHA_UP,
        payload: input.target.value
    }
}

export const doLoja =  (event, index, value) =>{
    console.log(value);
    return {
        type: LOJA,
        payload: value
    }
}
export const doQuantidade = value => {
    return {
        type: QUANTIDADE_UP,
        payload: value
    }
}

export const doSearchText = text => {
    return {
        type: SEARCH_TEXT_UP,
        payload: text
    }
}

export const doLogar = (usuario,senha) =>{
    return (dispatch) => {
        axios({
            method: 'post',
            url: URL_LOGIN,
            data: {usuario,senha},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(function(response){
            console.log(response);
            const data = response.data;
            if(data.login === "true"){
                setLogin(data.user,data.access_token);
                dispatch (
                    {
                        type: LOGIN_SUCCESS,
                    }
                )
            }else{
                dispatch (
                    {
                        type: LOGIN_ERROR,
                        payload: data.message
                    }
                )
            }
        }); 
    }
}

export const doLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("categorias");
    return {
        type: LOGOUT,
    }
}

export const doLoginError = () => {
    return {
        type: LOGIN_ERRO_RESET,
    }
}


export const getPedidos = () =>{
    
    return (dispatch) => {
        axios.get(
            URL_PEDIDOS,
            {
                params: {
                    'token': getToken(),
                },                
            }
        )
        .then(function(response){
            const pedidos = response.data.pedidos; 
            const categorias =_.values(response.data.categorias);
             
            dispatch (
                {
                    type: PEDIDOS_LISTAR, 
                    payload: {pedidos,categorias}
                }
            )            
        }).catch(function (error) {
            console.log('Token inválido!'+error);
        });
        

    }
}

export const doSendPedidos = (loja,data) =>{
    return (dispatch) => {
        axios({
            method: 'post',
            url: URL_PEDIDOS,
            data: {loja,data,token: getToken()},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(function(response){
            
            dispatch (
                {
                    type: PEDIDOS_ADD, 
                    payload: response.data.lista
                }
            )  
        })
    }
}

export const itemSelected = (data,i) => {
    const changedList = [].concat(data);
    const check = changedList[i];
    changedList[i] = !check;   
    return {
        type: PEDIDOS_ITEM_SELECIONADO,
        payload: changedList
    }
}


export const getProdutos = loja =>{
    return (dispatch) => {
        axios.get(
            HOST+'/loja/'+loja+'/lista',
            {
                params: {
                    'token': getToken(),
                },                
            }
        )
        .then(function(response){
            const produtos = response.data.produtos;
            const categorias =_.values(response.data.categorias);
            if(response.data.produto === true){
                dispatch (
                    {
                        type: LIST_PRODUTOS, 
                        payload: {produtos,categorias}
                    }
                )  
            }else{
                dispatch (
                    {
                        type: PRODUTOS_ERROR, 
                        payload: true
                    }
                )  
            }
                      
        }).catch(function (error) {
            console.log('Token inválido!'+error);
        });
    }
}

export const salvarLista = (data) =>{
    console.log(data);
}