import React from "react";
import FilaChat from "./FilaChat";
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
        $('.TodosMensajes').animate({scrollTop: obj.scrollHeight*obj.scrollHeight},"smooth");/*Para que baje directamente al ultimo mensaje*/
        const respuesta = await fetch("http://localhost/proyectochat/obtenerMensaje.php");//Devuelve los mensajes de la base de datos
        const chat = await respuesta.json();
        this.setState({
            chatmostrar:chat,/*Guardo el chat de la base de datos en el state*/
        });
    }
    render(){
        return (
            <div className="ChatPrincipal">
                <div className="TodosMensajes" id="MensajesScroll">
                    {this.state.chatmostrar.map(chatmostrar => {//Bucle para mostrar los mensajes linea por linea
                        return <FilaChat key={chatmostrar.id} chat={chatmostrar} usuario={this.state.chat.nombre}></FilaChat>;
                    })}
                </div>
            <div className="EnviarMensaje">
                <form onSubmit={this.manejarEnvioFormulario} autocomplete="off">
                        <input required placeholder="Mensaje" className="textEnviar" type="text" id="mensaje" onChange={this.manejarCambio} value={this.state.chat.mensaje} />
                        <button autoFocus className="botonEnviar" type="submit"><i className="fas fa-arrow-right"></i></button>
                </form>
            </div>
            </div>
        );
    }
    async manejarEnvioFormulario(evento) {
        evento.preventDefault();
        var user=(this.state.chat.nombre);
        const cargaUtil = JSON.stringify(this.state.chat);
        const respuesta = await fetch("http://localhost/proyectochat/enviarMensaje.php", {//Espera hasta que el fetch se resuelva con el await
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
            this.componentDidMount();//LLamo a la funcion componentDidMount para que muestre los mensajes introducidos
            var obj = document.getElementById('MensajesScroll');
            $('.TodosMensajes').animate({scrollTop: obj.scrollHeight},"smooth");//Al insertar un mensaje se bajara el scroll
        }
    }
    manejarCambio(evento){//Actualiza el estado de la variable chat
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