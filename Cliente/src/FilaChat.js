import React from 'react';

class FilaDeTabla extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        if(this.props.chat.user==this.props.usuario){//Comprueba cual es el usuario registrado para que su mensaje este a la derecha
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