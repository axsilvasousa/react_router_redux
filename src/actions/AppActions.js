import axios from 'axios';

export const doEmail = input => {
    return {
        type: "upEmail",
        payload: input.target.value
    }
}

export const userFetch = () =>{

    return (dispatch) => {

        axios.get('http://localhost/users.php')
        .then(function(response){

            setTimeout(
                ()=>{
                    const ativos = [];            
                    response.data.map((item,i)=>{
                        ativos[i] = item.check;
                        return ativos;
                    });

                    const collections = {
                        usuarios : response.data,
                        ativos:ativos
                    }

                    dispatch (
                        {
                            type: "LISTA_USER", 
                            payload: collections
                        }
                    )
                },10
            )
            
        }); 
    }
}

export const itemSelected = (data,i) => {
    const changedList = [].concat(data);
    const check = changedList[i];
    changedList[i] = !check;   
    console.log("Selecionado item ",i); 
    return {
        type: "itemSelecionado",
        payload: changedList
    }
}