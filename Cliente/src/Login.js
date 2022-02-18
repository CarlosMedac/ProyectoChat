import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";


class Login extends React.Component{
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
                    <h2>Inicio de sesion</h2>
                        <form onSubmit={this.manejarEnvioFormulario}>
                            <input className="LoginUser" autoFocus required placeholder="Nombre" id="nombre" type="text" onChange={this.manejarCambio} value={this.state.login.nombre}></input><br></br>
                            <input className="LoginPass" placeholder="Contraseña" required id="pass" type="password" onChange={this.manejarCambio} value={this.state.login.pass}></input><br></br>
                            <input className="BotonLogin" type="submit" id="button" value="Siguiente"></input>
                        </form>
                    <div className="RegistroLogin">No estas registrado <Link to="/Registro">Registrate ya</Link></div>
                </div>
            </div>
        );
    }
    async manejarEnvioFormulario(evento) {
        evento.preventDefault();
        try{
        const cargaUtil = JSON.stringify(this.state.login);
        localStorage.setItem("Nombre",this.state.login.nombre);
        const respuesta = await fetch("http://localhost/proyectochat/sesion.php", {
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
            window.location.href=("http://localhost:3000/Chat");
        }
        }catch(e){
            $(".LoginPass").css("border","solid 2px red");
            $(".LoginUser").css("border","solid 2px red");
        }  
    }
    manejarCambio(evento){
        $(".LoginPass").css("border","solid black 2px");
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
export default Login;