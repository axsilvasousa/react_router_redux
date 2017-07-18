import {
    USER_UP,
    SENHA_UP,
    PEDIDOS_LISTAR,
    PEDIDOS_ITEM_SELECIONADO
} from '../Constants';

const INITIAL_STATE = {
    usuario: '',
    senha:'',
    pedidos: '',
    ativos : '',   
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case USER_UP:
            return { ...state, usuario: action.payload }

        case SENHA_UP:
            return { ...state, senha: action.payload }

        case PEDIDOS_LISTAR:
            return{
                ...state, 
                pedidos : action.payload.pedidos,
                ativos : action.payload.ativos,
            }
        
        case PEDIDOS_ITEM_SELECIONADO:        
            return{
                ...state, ativos:action.payload
            }
        
        default:
            return state; 
    }   
}