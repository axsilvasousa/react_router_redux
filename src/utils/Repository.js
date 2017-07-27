
export const CheckToken = () =>{
      const token = localStorage.getItem('token');
      if(token){
        return true;          
      }else{
        return false;
      }      
}

export const getToken = () => {
    const token = localStorage.getItem('token');
    if(token){
        return JSON.parse(token);
    }else{
        return false;
    }    
}

export const setLogin = (user,token) => {
    localStorage.setItem('user',JSON.stringify(user));    
    localStorage.setItem('token',JSON.stringify(token));    
}

export const  categorias = () => {
    const categorias = localStorage.getItem('categorias');
    if(categorias.length){
        return categorias;
    }else{
        return [];
    }
}

export const  user = () => {
    const User = JSON.parse(localStorage.getItem('user'));
    if(User){
        return User;
    }else{
        return [];
    }
}

export const  getLojas = () => {
    const User = JSON.parse(localStorage.getItem('user'));
    if(User.lojas.length){
        return User.lojas;
    }else{
        return [];
    }
}

