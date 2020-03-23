/**
 * Configuracion de un usuario en el backend
 */

 export class Usuario{

    public nombre: string;
    public sala: string;


    constructor(public id: string) {
        
        this.nombre = 'sin-nombre',
        this.sala = 'sin-sala'

    }

 }