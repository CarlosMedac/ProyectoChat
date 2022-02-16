import React from "react";
import { Navigate } from 'react-router';
import { Link } from "react-router-dom";

class Registro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login:{
                "nombre":"",
                "pass":"",
            }
        }
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioFormulario = this.manejarEnvioFormulario.bind(this);
    }
    render(){
        return(
            <div>
                <h2>Crea tu cuenta</h2>
                <form onSubmit={this.manejarEnvioFormulario}>
                    <input autoFocus required placeholder="Nombre" id="nombre" type="text" onChange={this.manejarCambio} value={this.state.login.nombre}></input>
                    <input required placeholder="Contraseña" id="pass" type="password" onChange={this.manejarCambio} value={this.state.login.pass}></input>
                    <input type="submit" id="button"></input>
                </form>
            </div>
        );
    }
    async manejarEnvioFormulario(evento) {
        evento.preventDefault();
    
        const cargaUtil = JSON.stringify(this.state.login);
        const respuesta = await fetch("http://localhost/proyectochat/registro.php", {
            method: "POST",
            body: cargaUtil,
        });
        const exitoso = await respuesta.json();
        if (exitoso) {
            this.setState({
                chat: {
                    nombre: "",
                    pass: "",
                }
            });
            window.location.href=("http://localhost:3000/");
        } else {
            console.log("Envio mal");
        }
    }
    manejarCambio(evento){
        
        const clave = evento.currentTarget.id;
        let valor = evento.target.value;
        this.setState(state =>{
            const loginActualizado=state.login;
            loginActualizado[clave]=valor;
            return{
                login:loginActualizado,
            }
        });
    }
}
export default Registro;