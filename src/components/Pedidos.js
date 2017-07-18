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
    Snackbar,
    RaisedButton,
    Divider,
    SelectField, 
    MenuItem
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
        this.state = {
            value: null,
        };
         
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
            const Pedidos = this.sendPedidos;
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
    _handleSelect = (event, index, value) => this.setState({value});

    render(){
        return(
            <div style={{flex:1, display:'flex', flexDirection:'column'}}>   
                <div style={{position:'fixed',zIndex:1000, right:10,bottom:10}}>
                    <RaisedButton label="Enviar" primary={true} />
                </div>
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

                    

                    <div style={{padding:20,paddingTop:0}}>
                        <SelectField
                            floatingLabelText="Loja"
                            value={this.state.value}
                            onChange={this._handleSelect}
                            fullWidth={true}
                        >
                            <MenuItem value={1} primaryText="Jockey" />
                            <MenuItem value={2} primaryText="Shopping" />                        
                        </SelectField>

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
                            <FlatButton onClick={()=>this.doSendPedidos()}  style={{width:100,height:30, marginTop:10}}  label="ADICIONAR" secondary={true} />
                        </div>
                    </div>

                    <Divider style={{marginTop:10, marginBottom:10}}/>

                    <List style={{position:'relative',zIndex:2}}>
                        {
                            this.sendPedidos.map((item,i) =>{
                                if(item.qnt){
                                    return this._rederList(item,i);
                                }
                            
                            })
                        }
                    </List>
                       
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

const Styles = {
    floating : {
        position:"absolute",
        buttom:10,
        right:10,
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