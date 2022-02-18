import React from 'react';
import EnviarMensaje from "./EnviarMensaje";


class Home extends React.Component{
    
    constructor(props){
        var usuario=localStorage.getItem("Nombre");//Cojo la variable que he guardado en el localstorage y la guardo en el estado
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
                    <button className='eliminarchat' onClick={this.Eliminar}><i className="fas fa-trash"></i></button>
                    <button className='logout' onClick={this.Redireccionar}><i className="fas fa-arrow-left"></i></button>
                </div>                
                <EnviarMensaje usuario={user}></EnviarMensaje>       
            </div>
        ) 
        }
    }
    Redireccionar(){//Si vuelves se elimina la variable de usuario
        localStorage.setItem("Nombre","");
        window.location.href = "http://localhost:3000/";
    }
    Eliminar(){//Para eliminar todo el contenido del chat
    fetch("http://localhost/proyectochat/eliminarMensajes.php");
    window.location.href = window.location.href;  
    }
}

export default Home;