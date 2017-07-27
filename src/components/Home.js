import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';

import {
  BASE
} from '../Constants';

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
    },
    logo:{
        marginTop:50,
        marginBottom:100,
        width:100,
        heigth:150,
        marginLeft:'auto',
        marginRight:'auto',
        display:'table',
    }
}


const logo = require('../img/logo.png');


class Home extends Component{

    render(){
        return(
            <div>
               <img alt="Casa Açaí" src={logo} style={styles.logo} />
               <div style={styles.contentButtom}>
                    <Link to={BASE+"/pedidos"} >
                        <RaisedButton label="Pedidos" primary={true} style={styles.buttons} />
                    </Link>
                    <Link to={BASE+"/lista"} >
                        <RaisedButton label="Lista" secondary={true} style={styles.buttons} />
                    </Link>
               </div>
            </div>
        )
    }
}


export default Home;