import Server from "./classes/server";
import router  from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';


const server = Server.instance; //patron singlenton


/**
 * Middlewares
 */
//Body Parser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );
//Cors
server.app.use( cors({ origin: true, credentials: true}) );
//Rutas a servicios
server.app.use('/', router);



server.start( () => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});