import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    List, 
    ListItem,
    AppBar,
    IconButton,
    AutoComplete,
    FlatButton,
    TextField,
    RaisedButton,
    Divider,
    Subheader
} from 'material-ui';
import {pink600} from 'material-ui/styles/colors';
import NavigatioBack from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import{ Redirect } from 'react-router-dom';
import { 
    doSearchText, 
    getPedidos,
    doQuantidade,
    doSendPedidos
} from '../actions/AppActions';
 
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

import {
  BASE
} from '../Constants';

class Produtos extends Component{

    constructor(props){
        super(props);
        this.categorias = [];
        this.pedidos = [];
        this.lista = [];
        this.sendPedidos = [];
        this.state = {
            open: false,
            snackerMsg: '',
            produto : '',
            loja_id: '',
        };
    }

    componentWillMount() {
        this.setState({
            loja_id:0,
        })
        this.props.getPedidos();
    }
   
    componentWillReceiveProps(nextProps) {
        this.criaListaPedidos(nextProps.pedidos);   
        this.categorias = nextProps.categorias;
    }

    criaListaPedidos(pedidos){
        this.pedidos = pedidos;
        const list = [];
        pedidos.map((data,i) => {
            list.push(data.title);
            return list;
        });
        this.lista = list;          
    }  

    handleUpdateInput = (searchText) => {
        this.props.doSearchText(searchText);
    };

    handleNewRequest = (e,i) => {
        this.setState({
            produto: this.pedidos[i]
        })
    };

    _doAddPedido(){
        const pro = this.state.produto;
        pro.qnt = this.props.quantidade;
        this.sendPedidos.push(pro);

        this.props.doQuantidade(1);
        this.props.doSearchText('');
    }

    _rederList(cat,item,i){
        return (
            cat === item.categoria_id ?
                <div>
                    <ListItem                
                        key={i}               
                        primaryText={item.qnt + ' - ' + item.title }                 
                    />  
                    <Divider />
                </div>            
            : ''
        )
    }



    render(){
        if(this.props.lista){
            return(
                 <Redirect to={{
                    pathname: BASE+'/lista/',
                }}/>
            )
        }

        return(
            <div style={{flex:1, display:'flex', flexDirection:'column'}}>  
                 
                <div style={{position:'fixed',zIndex:1000, right:10,bottom:10}}>
                    <RaisedButton onTouchTap={
                            () => this.props.doSendPedidos(this.state.loja_id,this.sendPedidos) 
                        }
                        label="Enviar" primary={true} />
                </div>
               
                <ReactCSSTransitionGroup
                    transitionName="fadeIn"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    
                    <AppBar
                                
                            onLeftIconButtonTouchTap = {() => this.props.history.goBack() }
                            iconElementLeft={                        
                                <IconButton>
                                    <NavigatioBack/>
                                </IconButton>
                            }
                            title="Pedidos"
                    />

                    
                    <Subheader>
                        { 
                            
                        }
                    </Subheader>
                    <div style={{padding:20,paddingTop:0}}>
                        
                        <AutoComplete
                    
                            hintText="Digite o nome do produto"
                            searchText={this.props.searchText}
                            onUpdateInput={this.handleUpdateInput}
                            onNewRequest={(e,i) => this.handleNewRequest(e,i)}
                            dataSource={this.lista}
                            filter={AutoComplete.caseInsensitiveFilter}
                            fullWidth={true}
                        />
                        <div style={{display:'flex',flex:1, flexDirection:'row',justifyContent:'space-between'}}>
                            <TextField
                                hintText="Quantidade"
                                style={{width:100}}
                                value={this.props.quantidade}                                
                                onChange={(input) => this.props.doQuantidade(input.target.value)}
                            />
                            <FlatButton onClick={()=>this._doAddPedido()}  style={{width:100,height:30, marginTop:10}}  label="ADICIONAR" secondary={true} />
                        </div>
                    </div>

                    <Divider style={{marginTop:10, marginBottom:10, backgroundColor:pink600 }}/>

                    <List style={{position:'relative',zIndex:2}}>
                        {
                            this.categorias.map(c =>{
                                return <div key={c.id}>
                                    <Subheader>{c.title}</Subheader>
                                    {
                                        this.sendPedidos.map((item,i) =>{
                                            return this._rederList(c.id,item,i);                            
                                        })
                                    }
                                    
                                </div>
                            })
                        }
                        
                    </List>
                       
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}


const mapStateToProps = state => { 
    console.log(state.AppReducers.categorias);
    return (
        {
            pedidos: state.AppReducers.pedidos,
            quantidade: state.AppReducers.quantidade,
            searchText:state.AppReducers.searchText,
            lista :state.AppReducers.lista,
            produtos:state.AppReducers.produtos,
            categorias:state.AppReducers.categorias,
            pedido_adicionado_success:state.AppReducers.pedido_adicionado_success,
        }
    )
}

export default connect(mapStateToProps, { 
    doSearchText,
    doQuantidade,
    getPedidos,
    doSendPedidos
})(Produtos);