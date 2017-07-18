import axios from 'axios';
import {
    USER_UP,
    SENHA_UP,
    PEDIDOS_LISTAR,
    PEDIDOS_ITEM_SELECIONADO,
    URL_LOGIN
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
export const userFetch = () =>{

    return (dispatch) => {

        axios.get('http://localhost/casadoacai/api/pedidos')
        .then(function(response){
            const pedidos = response.data.pedidos; 
            console.log("ACtions",pedidos);
            
            const ativos = [];            
            pedidos.map((item,i)=>{
                ativos[i] = item.check;
                return ativos;
            });

            const collections = {
                pedidos,
                ativos
            }

            dispatch (
                {
                    type: PEDIDOS_LISTAR, 
                    payload: collections
                }
            )
            
        }); 
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