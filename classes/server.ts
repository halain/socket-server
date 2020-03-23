/**
 * Clase de definicion del servidor con express y configuracion de socket.io
 */

import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http'; //necesario para la comunicacion de socket.io con el server nodejs, porque no se hace directamente con express

import * as socket from '../sockets/socket'; //importar todas la logica de los sockets


export default class Server {

    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer ); //configuracion de socketio con el server http de node

        this.ecucharSockets();
    }

    /**
     * Patron singlenton, constructor debe ser privado, propiedad _instance privada y static.
     * Este es el metodo que se debe llamar cuando se dese instancia al servidor, en ves de decir new Server()
     */
    public static get instance(){
        return this._instance  || (  this._instance = new this());
    }


    /**
     * Metodo para escuchar sockets
     */
    private ecucharSockets(){

        console.log('Escuchando conexiones - sockets');
        
        this.io.on('connection', cliente => {
            
            //console.log('Cliente conectado ... ');

            // cliente.id = lUbeeQz7QTEfbN2bAAAA     es generado en cada conexion para cada cliente
           // console.log(cliente.id);
           
            //Conectar cliente
            socket.conectarCliente( cliente );

            //Configurar usuario
            socket.configurarUsuario(cliente, this.io)
            
            //Mensajes
            socket.mensaje( cliente, this.io);


            //Desconectar
            socket.desconectar( cliente );
            
        });
        
    }

    
    /**
     * Metodo para inicializar el servidor
     * @param callback 
     */
    start( callback: Function ){
        
        //this.app.listen( this.port, callback() ); //inicializa el servidor con express
        //para que funcione sockeio se debe inicializar el servidor http directamente y no con exprees, por eso se comenta la linea anterior
        this.httpServer.listen( this.port, callback() ); //inicializar servidor http


    }

}