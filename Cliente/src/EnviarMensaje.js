import React from "react";
import FilaDeTabla from "./FilaTabla";
import $ from "jquery";


class EnviarMensaje extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chatmostrar:[],
            chat:{
                "mensaje":"",
                "nombre":props.usuario,
            },
        };
        
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioFormulario = this.manejarEnvioFormulario.bind(this);
    }
    async componentDidMount(){
        var obj = document.getElementById('MensajesScroll');
        $('.TodosMensajes').animate({scrollTop: obj.scrollHeight*obj.scrollHeight},"smooth");
        const respuesta = await fetch("http://localhost/proyectochat/obtenerMensaje.php");
        const chat = await respuesta.json();
        this.setState({
            chatmostrar:chat,
        });
    }
    render(){
        var user=(this.state.chat.nombre);
        
        return (
            <div>
            <div className="TodosMensajes" id="MensajesScroll">
                <div className="Todoelchat">
                    {this.state.chatmostrar.map(chatmostrar => {
                        return <FilaDeTabla key={chatmostrar.id} chat={chatmostrar} usuario={user}></FilaDeTabla>;
                    })}
                </div>
            </div>
            <div className="EnviarMensaje">
                <form onSubmit={this.manejarEnvioFormulario}>
                        <input required placeholder="Mensaje" className="textEnviar" type="text" id="mensaje" onChange={this.manejarCambio} value={this.state.chat.mensaje} />
                        <button className="botonEnviar" type="submit"><i className="fas fa-arrow-right"></i></button>
                </form>
            </div>
            </div>
        );
        
    }
    async manejarEnvioFormulario(evento) {
        evento.preventDefault();
        var user=(this.state.chat.nombre);
        const cargaUtil = JSON.stringify(this.state.chat);
        const respuesta = await fetch("http://localhost/proyectochat/enviarMensaje.php", {
            method: "POST",
            body: cargaUtil,
        });
        const exitoso = await respuesta.json();
        if (exitoso) {
            this.setState({
                chat: {
                    mensaje: "",
                    nombre:user,
                }
            });
            this.componentDidMount();
            var obj = document.getElementById('MensajesScroll');
            console.log(obj.scrollHeight);
            $('.TodosMensajes').animate({scrollTop: obj.scrollHeight},"smooth");

        } else {
            console.log("Envio mal");
        }
    }
    manejarCambio(evento){
        
        const clave = evento.currentTarget.id;
        let valor = evento.target.value;
        this.setState(state =>{
            const chatActualizado=state.chat;
            chatActualizado[clave]=valor;
            return{
                chat:chatActualizado,
            }
        });
    }

}

export default EnviarMensaje;