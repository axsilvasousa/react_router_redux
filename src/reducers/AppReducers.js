const INITIAL_STATE = {
    email: '',
    usuarios: '',
    ativos : '',
   
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "upEmail":
            return { ...state, email: action.payload }

        case "LISTA_USER":
            return{
                ...state, 
                usuarios : action.payload.usuarios,
                ativos : action.payload.ativos,
            }
        
        case "itemSelecionado":        
            console.log("Reducers",action.payload);
            return{
                ...state, ativos:action.payload
            }
        
        default:
            return state; 
    }   
}