import React,{Component} from 'react'
import { connect } from 'react-redux';

import {
    AppBar,
    IconButton,
    Subheader,
    MenuItem,
    List,
    ListItem,
    Checkbox,
    Divider,
    SelectField,
    FloatingActionButton
} from 'material-ui';
import ContentSend from 'material-ui/svg-icons/content/send';
import {pink600} from 'material-ui/styles/colors';

import NavigatioBack from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

import { 
    getProdutos, 
    salvarLista
} from '../actions/AppActions';

import { getLojas } from '../utils/Repository';

import {DataProduto} from '../utils/Date';
import {
  BASE
} from '../Constants';

import '../App.css';

class Lista extends Component{
     constructor(props){
        super(props);
        this.state = {
            value : 0,
            produtos : [],
            lojas:[],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAtivo = this.handleAtivo.bind(this);
        
    }

    componentWillMount(){
        this.setState({
            lojas: getLojas()
        });

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            produtos : nextProps.produtos
        });   
    }

    handleChange(event, index, value) {
        this.setState({value});
        this.props.getProdutos(value);
    };

    handleAtivo(posicao){
        const AllProd = Array.from(this.state.produtos);
        AllProd[posicao].checked = !AllProd[posicao].checked;
        this.setState({
            produtos : AllProd
        });   
    }   
    
     _rederList(cat,item,i){
        return (
            cat === item.categoria_id ?
                <ListItem
                    key={item.id}
                    leftCheckbox={<Checkbox onCheck={()=>this.handleAtivo(i) } checked={this.state.produtos[i].checked} />}
                    primaryText={item.title}
                    secondaryText={DataProduto(item.created)}
                />
            : ''
        )
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
                    <div>
                    
                    <AppBar                                
                        onLeftIconButtonTouchTap = {() => this.props.history.push(BASE+'/home') }
                        iconElementLeft={                        
                            <IconButton>
                                <NavigatioBack/>
                            </IconButton>
                        }
                        style={{backgroundColor:pink600}}
                        title="Lista"
                    />

                    <div style={{margin:20}}>
                        <SelectField
                        value={this.state.value}
                        onChange={this.handleChange}
                        fullWidth={true}
                        hintText="Selecione a loja"
                        >
                        {this.state.lojas.map((loja,i)=>{
                            return <MenuItem key={i} value={loja.loja_id} primaryText={loja.loja_name} />
                        })}
                        </SelectField>
                    </div>
                    
                    <List>
                        <div>
                        {                            
                            this.state.produtos.length ? 
                                
                                this.props.categorias.map(c =>{
                                    return <div key={c.id}>
                                        <Subheader>{c.categoria}</Subheader>
                                        <div style={{paddingLeft:20, paddingRight:20}} >
                                            {
                                                this.state.produtos.map((item,i) =>{
                                                    return this._rederList(c.id,item,i)                      
                                                })
                                            }
                                        </div>
                                        <Divider />
                                    </div>
                                })
                                : !this.props.produto_error || <div>Lista sem Produtos</div>                               
                                
                        }
                        </div>
                        </List>
                    {
                        !this.state.produtos.length  || 
                        <div className="btnFloat">
                            <FloatingActionButton  onClick={()=>this.props.salvarLista(this.state.produtos)}  secondary={true} >
                                <ContentSend />
                            </FloatingActionButton>
                        </div>
                    }
                    </div>
                    
                </ReactCSSTransitionGroup>
            </div>
        )
    }
};
const mapStateToProps = state => { 
    return (
        {
            produtos : state.AppReducers.produtos, 
            categorias: state.AppReducers.categorias,
            produto_error: state.AppReducers.produto_error,

        }
    )
}

export default connect(mapStateToProps, { 
    getProdutos,
    salvarLista
})(Lista);