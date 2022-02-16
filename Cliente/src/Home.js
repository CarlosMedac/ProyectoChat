import React from 'react';
import EnviarMensaje from "./EnviarMensaje";


class Home extends React.Component{
    
    constructor(props){
        var usuario=localStorage.getItem("Nombre");
        super(props);
        this.state = {
            chat:{
                "user":usuario,
            },
        };
        this.Redireccionar = this.Redireccionar.bind(this);
    }
    render(){
        var user=(this.state.chat.user);
        var primerCaracter = user.charAt(0);
        if(user==""){//Comprueba que si te has salido del chat con el boton no poder meterte otra vez a no ser que inicies sesion
            window.location.href = "http://localhost:3000/";
        }else{
        return(
            <div className='home'>
                <div className='cabecera'>
                    <div className='perfil'>{primerCaracter}</div>
                    <h3 className='nombrePerfil'>{user}</h3>
                    <button className='logout' onClick={this.Redireccionar}><i className="fas fa-arrow-left"></i></button>
                </div>                
                <EnviarMensaje usuario={user}></EnviarMensaje>       
            </div>
           
        ) 
        }
    }
    Redireccionar(){
        localStorage.setItem("Nombre","");
        window.location.href = "http://localhost:3000/";
    }
}

export default Home;