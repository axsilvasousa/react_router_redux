import {
    USER_UP,
    SENHA_UP,
    PEDIDOS_LISTAR,
    PEDIDOS_ITEM_SELECIONADO,
    QUANTIDADE_UP,
    SEARCH_TEXT_UP,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    LOGIN_ERRO_RESET,
    PEDIDOS_ADD,
    LIST_PRODUTOS,
    PRODUTOS_ERROR
} from '../Constants';

const INITIAL_STATE = {
    usuario: '',
    senha:'',
    pedidos: [],
    quantidade : 1,
    ativos : '',
    searchText : '',
    loja: '',
    login : false,
    login_msg : '',
    login_error: false,
    lista: '',
    pedido_adicionado_success: false,
    produtos: [],  
    categorias : [],

    produto_error : false,
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        
        case USER_UP:
            return { ...state, usuario: action.payload }

        case SENHA_UP:
            return { ...state, senha: action.payload }
        
        case LOGIN_SUCCESS:
            return { ...state, 
                login:true,
                login_error : false,
                login_msg: '',
            }

        
        case LOGIN_ERROR:
            return { 
                ...state, 
                login:false, 
                login_error : true,
                usuario : '',
                senha: '',
                login_msg: action.payload,
             }

        case LOGIN_ERRO_RESET:
            return { ...state, login_error:false }

        case LOGOUT:
            return { ...state, logado:false, login_status:false }

        case QUANTIDADE_UP:
            return { ...state, quantidade: action.payload }
        
        case SEARCH_TEXT_UP:
            return { ...state, searchText: action.payload }
        
        case PEDIDOS_LISTAR:
            return{
                ...state, 
                pedidos : action.payload.pedidos,
                categorias : action.payload.categorias,
            }
        
        case PEDIDOS_ITEM_SELECIONADO:        
            return{
                ...state, ativos:action.payload
            }
        
        case PEDIDOS_ADD:   
            return{
                ...state, 
                pedido_adicionado_success:true,
                lista: action.payload,
            }

        case LIST_PRODUTOS:   
            console.log("Reducers","succs");
            return{
                ...state, 
                produtos:action.payload.produtos,
                categorias:action.payload.categorias,
            }

        case PRODUTOS_ERROR:
            console.log("Reducers","error");
        
            return{
                ...state, 
                produtos:[],
                produto_error:true
            }

        default:
            return state; 
    }   
}