import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    List, 
    ListItem,
    AppBar,
    IconButton,
    AutoComplete,
    FlatButton,
    TextField,
    Snackbar 
} from 'material-ui';
import NavigatioBack from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { addPedidos,doSearchText, getProdutos,doQuantidade } from '../actions/AppActions';
import '../App.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 


class Pedidos extends Component{

    constructor(props){
        super(props);
        this.pedidos = [];
        this.lista = [];
        this.sendPedidos = [];
        this.state = {
            open: false,
            snackerMsg: '',
        };
    }

    componentWillMount() {
        this.props.getProdutos();
    }
   
    componentWillReceiveProps(nextProps) {
        this.criaListaPedidos(nextProps.pedidos);   
    }

    criaListaPedidos(pedidos){
        this.pedidos = pedidos;
        const list = [];
        pedidos.map((data,i) => {
            list.push(data.name);
            return list;
        });
        this.lista = list;   
         
    }  

    handleUpdateInput = (searchText) => {
        this.props.doSearchText(searchText);
    };

    handleNewRequest = (e,i) => {
        this.sendPedidos.push(this.pedidos[i]);        
    };

    doSendPedidos(){
        if(this.sendPedidos.length ){
             const n  = this.props.quantidade;
            this.sendPedidos[this.sendPedidos.length - 1].qnt = n;
            this.props.doQuantidade(1);
            this.props.doSearchText('');
            
            localStorage.setItem("pedidos", JSON.stringify(Pedidos));
        }else{
            this.setState({
                snackerMsg:'Adicione um produto!',
                open: true,
            });
        }       
    }

   

    _handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    _rederList(item,i){
        return (
            <ListItem                
                key={item.id}               
                primaryText={item.name}                 
            />  
        )
    }
   
    render(){
        return(
            <div>    
                <Snackbar
                    open={this.state.open}
                    message={this.state.snackerMsg}
                    autoHideDuration={4000}
                    onRequestClose={this._handleRequestClose}
                />

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

                    <div style={{ flex:1,margin:20, }}>
                        <AutoComplete
            
                            hintText="Type 'r', case insensitive"
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
                            <FlatButton onClick={()=>this.doSendPedidos()}  style={{width:100,height:30, marginTop:10}}  label="ADICIONAR" secondary={true} />
                        </div>
                    </div>


                    
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

const mapStateToProps = state => { 
    return (
        {
            pedidos: state.AppReducers.pedidos,
            quantidade: state.AppReducers.quantidade,
            searchText:state.AppReducers.searchText,
        }
    )
}

export default connect(mapStateToProps, { doSearchText,doQuantidade,addPedidos,getProdutos })(Pedidos);