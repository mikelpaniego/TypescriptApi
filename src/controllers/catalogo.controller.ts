import {Request, Response} from 'express'
import {database} from '../database'

export function getCatalogo (req: Request, res: Response): Response { 
    return res.json(database.pizzas);
}