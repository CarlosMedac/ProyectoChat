import React from 'react';

class FilaDeTabla extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{
                "nombre":props.usuario,
            }
        }
    }
    render() {
        var user=this.props.usuario;
        if(this.props.chat.user==user){
            return (
                <div className='MensajeDerecha'>
                    <div className='MensajeUserDer'>{this.props.chat.user}</div>
                    <div className='MensajeMensaje'>{this.props.chat.mensaje}</div>
                    <div className='MensajeFecha'>{this.props.chat.fecha}</div>
                </div>
            );
        }else{
            return (
                <div className='Mensaje'>
                    <div className='MensajeUser'>{this.props.chat.user}</div>
                    <div className='MensajeMensaje'>{this.props.chat.mensaje}</div>
                    <div className='MensajeFecha'>{this.props.chat.fecha}</div>
                </div>
            );
        }
        
    }
}

export default FilaDeTabla;