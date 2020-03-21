import { Socket } from 'socket.io';


export const desconectar = ( cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado ...');
        
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
