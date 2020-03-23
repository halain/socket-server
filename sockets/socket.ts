import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuariosLista();


export const conectarCliente = ( cliente: Socket ) => {
    
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar(usuario);

}


export const desconectar = ( cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log(`Cliente ${cliente.id} desconectado`);
        usuariosConectados.borrarUsuario(cliente.id);
        
    });

}

//Escuchar mensajes
export const mensaje = ( cliente: Socket, io: SocketIO.Server) => {

    //escucha mensaje de evento "mensaje"
    cliente.on('mensaje', ( payload: {de: string, cuerpo: string} ) => {
        
        console.log('Mensaje recibido ', payload);

        //emite evento "mensaje-nuevo" a todos los clientes
        io.emit('mensaje-nuevo', payload);
        
        
    });
}


//Escuchar configurar-usuario. Recomendable guadar la sesion de usuarios conectados en bbdd o utilizar jsonWebtoken
export const configurarUsuario = ( cliente: Socket, io: SocketIO.Server) => {

    //escucha mensaje de evento "mensaje"
    cliente.on('configurar-usuario', ( payload: {nombre: string }, callback: Function ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre )

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });

        //emite evento "usuario-online" a todos los clientes
        //io.emit('usuario-online', payload);
        
    });

}
