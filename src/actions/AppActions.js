import axios from 'axios';
import {
    USER_UP,
    SENHA_UP,
    PEDIDOS_ADD,
    PEDIDOS_LISTAR,
    PEDIDOS_ITEM_SELECIONADO,
    URL_LOGIN,
    URL_PEDIDOS,
    QUANTIDADE_UP,
    SEARCH_TEXT_UP
    
} from '../Constants';


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
            data: {
                usuario,
                senha,
            },
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log("Error ao enviar",error);
        });
    }
}
export const getProdutos = () =>{
    return (dispatch) => {

        axios.get(URL_PEDIDOS)
        .then(function(response){
            const pedidos = response.data; 
            dispatch (
                {
                    type: PEDIDOS_LISTAR, 
                    payload: pedidos
                }
            )
            
        }); 
    }
}

export const addPedidos = (data) =>{
    return {
        type: PEDIDOS_ADD,
        payload: data
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