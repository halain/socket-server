import {Router, Request, Response} from 'express';

const router = Router();



/**
 * Peticion get a url /mensajes
 */
router.get('/mensajes', (req: Request,res: Response) => {
   
    res.json({
        ok:true,
        mensaje: 'Todo esta bien'
    });

});


/**
 * Peticion post a url /mensajes
 */
router.post('/mensajes', (req: Request,res: Response) => {

    const {cuerpo, de} = req.body;
   
    res.json({
        ok:true,
        cuerpo,
        de
    });

});

/**
 * Peticion post a url /mensajes/:argumento
 */
router.post('/mensajes/:id', (req: Request,res: Response) => {

    const {cuerpo, de} = req.body; //data del cuerpo del form
    const id = req.params.id;  //parametros por url
   
    res.json({
        ok:true,
        cuerpo,
        de,
        id
    });

});


export default router;