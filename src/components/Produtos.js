import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    List, 
    ListItem,
    Subheader,
    Checkbox,
    AppBar,
    IconButton
} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import NavigatioBack from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { doEmail,userFetch,itemSelected } from '../actions/AppActions';
import { Link,Redirect  } from 'react-router-dom'
import '../App.css';

class Produtos extends Component{

    constructor(props){
        super(props);
        this.listaUsuarios = []
        this._itemSelected = this._itemSelected.bind(this);
        this._navigatioBack = this._navigatioBack.bind(this);
    }
    componentWillMount() {
        this.props.userFetch();
    }

    _itemSelected(i){
        this.props.itemSelected(this.props.ativos,i)
    }

    componentWillReceiveProps(nextProps) {
        this.listaUsuarios = nextProps.usuarios;   
    }

    
    _rederList(item,i){
        return (
            <ListItem                
                key={item.id}
                leftCheckbox={
                    <Checkbox checked={this.props.ativos[i]} />
                }
                primaryText={item.name}
                onTouchTap={() => this._itemSelected(i) }
            />  
        )
    }
    _navigatioBack(){
        this.props.history.goBack();
    }

   
    render(){
        return(
            <div>
                 <AppBar
                    onLeftIconButtonTouchTap = {() => this._navigatioBack()}
                    iconElementLeft={                        
                        <IconButton>
                            <NavigatioBack/>
                        </IconButton>
                    }
                    title="Pedidos"
                />
                <List>
                    <Subheader>Hangout Notifications</Subheader>
                    
                    {
                        this.listaUsuarios.map((item,i) => {
                           return  this._rederList(item,i);
                        })
                    }          
                
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => { 
    console.log("MapState",state.AppReducers.ativos);
    return (
        {
            email: state.AppReducers.email,
            usuarios: state.AppReducers.usuarios,
            ativos : state.AppReducers.ativos
        }
    )
}

export default connect(mapStateToProps, { doEmail,userFetch,itemSelected })(Produtos);