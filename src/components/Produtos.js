import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    List, 
    ListItem,
    Subheader,
    Checkbox,
    AppBar,
    IconButton,
    CircularProgress
} from 'material-ui';
import NavigatioBack from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { userFetch,itemSelected } from '../actions/AppActions';
import '../App.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
class Produtos extends Component{

    constructor(props){
        super(props);
        this.listaPedidos = []
        this._itemSelected = this._itemSelected.bind(this);
    }
    componentWillMount() {
        this.props.userFetch();
    }

    _itemSelected(i){
        this.props.itemSelected(this.props.ativos,i)
    }

    componentWillReceiveProps(nextProps) {
        this.listaPedidos = nextProps.pedidos;   
    }

    _rederList(item,i){
        return (
            <ListItem                
                key={item.id}
                leftCheckbox={
                    <Checkbox checked={this.props.ativos[i]} />
                }
                primaryText={item.title}
                onTouchTap={() => this._itemSelected(i) }
            />  
        )
    }
   
    render(){
        return(
            <div>                 
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
                    
                    <List>
                        <Subheader>Hangout Notifications</Subheader>
                        
                        {
                            
                            this.listaPedidos.length ? 
                            this.listaPedidos.map((item,i) => {
                                return  this._rederList(item,i);
                            }) : <CircularProgress />
                            
                        }          
                    
                    </List>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

const mapStateToProps = state => { 
    console.log("Reducers",state.AppReducers.pedidos);
    return (
        {
            pedidos: state.AppReducers.pedidos,
            ativos : state.AppReducers.ativos
        }
    )
}

export default connect(mapStateToProps, { userFetch,itemSelected })(Produtos);