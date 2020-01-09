import {Request, Response} from 'express'
import {database} from '../database'

export function getCatalogo (req: Request, res: Response): Response { 
    let filter = req.params.filter;
    let result = database.pizzas;

    if (filter) {
        filter = filter.toLowerCase()
        result = result.filter(x => x.ingredientes.toLowerCase().includes(filter) || x.nombre.toLowerCase().includes(filter) 
        || x.tamaño.toLowerCase().includes(filter));
    }
    return res.json(result);
}