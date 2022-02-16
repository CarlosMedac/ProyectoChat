import react from "react";
import FilaDeTabla from "./FilaTabla";

class VerMensaje extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            chat:[],
            "usuario":props.usuario,
        };
        
    }
    async componentDidMount(){
        const respuesta = await fetch("http://localhost/proyectochat/obtenerMensaje.php");
        const chat = await respuesta.json();
        this.setState({
            chat:chat,
        });
    }
    render() {
        var user=(this.state.usuario);
        return (
            <div className="TodosMensajes">
                <div className="Todoelchat">
                    {this.state.chat.map(chat => {
                        return <FilaDeTabla key={chat.id} chat={chat} usuario={user}></FilaDeTabla>;
                    })}
                </div>
            </div>
        );
    }
}
export default VerMensaje;