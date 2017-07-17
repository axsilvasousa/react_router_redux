import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {  } from '../actions/AppActions';
import RaisedButton from 'material-ui/RaisedButton';

import '../App.css';

const styles = {
    contentButtom:{
        flexDirection:"row",
        justifyContent:"center",
        flex:1,
        display: "flex"
    },
    buttons : {
        marginLeft:15
    }
}

class Home extends Component{

    constructor(props){
        super(props);
       
    }
    
   
    render(){
        return(
            <div>
               <h2>Home</h2>
               <div style={styles.contentButtom}>
                    <Link to="/produtos" >
                        <RaisedButton label="Pedidos" primary={true} style={styles.buttons} />
                    </Link>
                    <Link to="/lista" >
                        <RaisedButton label="Lista" secondary={true} style={styles.buttons} />
                    </Link>
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => {     
    return null
}

export default connect(mapStateToProps, { })(Home);