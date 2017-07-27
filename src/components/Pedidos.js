import React,{Component} from 'react';

import Produtos from './Produtos';
import Lojas from './Lojas';


class Pedidos extends Component {
    constructor(props){
        super(props);
        this.state = {
            loja : 0,
        }
    }

    componentWillMount(){
        this.setState({
            loja : this.props.match.params.loja ? this.props.match.params.loja : 0,
        })
    }
    
    render(){
        return( 
            this.state.loja === 0 ?
                <Lojas history={this.props.history} />
            : <Produtos history={this.props.history} loja={this.state.loja - 1} />
        )
         
    }    
    
}

export default Pedidos;