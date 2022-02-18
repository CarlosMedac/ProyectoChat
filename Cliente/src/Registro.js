import React from "react";
import $ from "jquery";
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
            <div className="Login">
                <div className="BloqueLogin">
                    <h2>Crea tu cuenta</h2>
                        <form onSubmit={this.manejarEnvioFormulario}>
                            <input className="LoginUsuario" autoFocus required placeholder="Nombre" id="nombre" type="text" onChange={this.manejarCambio} value={this.state.login.nombre}></input><br></br>
                            <input required placeholder="Contraseña" id="pass" type="password" onChange={this.manejarCambio} value={this.state.login.pass}></input><br></br>
                            <input className="BotonLogin" type="submit" id="button"></input><br></br>
                            <div className="RegistroLogin">Si ya estas registrado <Link to="/">Inicia sesion</Link></div>
                        </form>
                </div>
            </div>
        );
    }
    async manejarEnvioFormulario(evento) {
        evento.preventDefault();
        try{
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
            }
        }catch(e){
            $(".LoginUsuario").css("border","solid 2px red");
        }
    }
    manejarCambio(evento){
        $(".LoginUsuario").css("border","solid black 2px");
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