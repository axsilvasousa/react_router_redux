import {
    USER_UP,
    SENHA_UP,
    PEDIDOS_ADD,
    PEDIDOS_LISTAR,
    PEDIDOS_ITEM_SELECIONADO,
    QUANTIDADE_UP,
    SEARCH_TEXT_UP
} from '../Constants';

const INITIAL_STATE = {
    usuario: '',
    senha:'',
    pedidos: [],
    quantidade : 1,
    ativos : '',
    searchText : '',
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case USER_UP:
            return { ...state, usuario: action.payload }

        case SENHA_UP:
            return { ...state, senha: action.payload }
        
        case QUANTIDADE_UP:
            return { ...state, quantidade: action.payload }
        
        case SEARCH_TEXT_UP:
            return { ...state, searchText: action.payload }

        case PEDIDOS_LISTAR:
            console.log(action.payload);
            return{
                ...state, 
                pedidos : action.payload,
            }
        
        case PEDIDOS_ITEM_SELECIONADO:        
            return{
                ...state, ativos:action.payload
            }
        
        default:
            return state; 
    }   
}