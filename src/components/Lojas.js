import React,{Component} from 'react'
import { connect } from 'react-redux';

import {
    AppBar,
    IconButton,
    Paper,
    Subheader
} from 'material-ui';
import NavigatioBack from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import {doLoja} from '../actions/AppActions';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import { Link } from 'react-router-dom'
import '../App.css';

import{
    getLojas
} from '../utils/Repository';

import {
  BASE
} from '../Constants';


class Lojas extends Component{
    
    state = {
        lojas : getLojas()
    }
    render(){
        
        return(
            <div style={{flex:1, display:'flex', flexDirection:'column'}}>   
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
                    <Subheader>Escolha a loja!</Subheader>
                    
                    {
                        this.state.lojas.map((loja, i)=>{
                            return (
                                <Link key={i} style={styles.noLink} to={`${BASE}/pedidos/${i + 1}`} >
                                    <Paper style={styles.cardLoja} zDepth={1}>
                                        <h4 style={{margin:0}}>{loja.loja_name}</h4>
                                        <p style={{marginBottom:0}}>{loja.loja_endereco}</p>
                                    </Paper>
                                </Link>
                            )
                        })
                    }
                    

                </ReactCSSTransitionGroup>
            </div>
        )
    }
};

const styles = {
    cardLoja:{
        margin:20,
        padding:20,
    },
    noLink:{
        color:"black",
        textDecoration:"none"
    }
}

export default connect(null, {doLoja})(Lojas);