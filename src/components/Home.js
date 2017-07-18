import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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

    render(){
        return(
            <div>
               <h2>Home</h2>
               <div style={styles.contentButtom}>
                    <Link to="/pedidos" >
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

export default Home;