import {Request, Response} from 'express'
import {database} from '../database'
import { Pedido } from '../models/pedido';

export function getPedidos (req: Request, res: Response): Response { 
    return res.json(database.pedidos);
}

export function createPedido (req: Request, res: Response): Response { 
    const newPedido: Pedido = req.body;
    newPedido.id = database.nextPedidoId();
    newPedido.importe = calcularPrecio(newPedido);
    newPedido.fecha = new Date();
    database.pedidos.push(newPedido);
    console.log('Envío de correo usando nodemailer');
    return res.json({message: 'Pedido creado, son ' + newPedido.importe + 'euros'});
}

export function deletePedido (req: Request, res: Response): Response { 
    const idPedido = req.params.idPedido;
    const oldPedido = database.pedidos.find( x => x.id === Number(idPedido));
    if (!oldPedido) {
        res.status(400);
        return res.json('Bad Request');
    } else {
        database.pedidos = database.pedidos.filter(obj => obj !== oldPedido);
        return res.json({message: 'Pedido eliminado'});
    }    
}

export function updatePedido (req: Request, res: Response): Response { 
    const idPedido = req.params.idPedido;
    const newPedido: Pedido = req.body;
    if (Number(idPedido) !== newPedido.id) {        
        res.status(400);
        return res.json('Bad Request');
    } else {
        const oldPedido = database.pedidos.find( x => idPedido);
        newPedido.importe = calcularPrecio(newPedido);
        newPedido.fecha = new Date();
        database.pedidos = database.pedidos.filter(obj => obj !== oldPedido);
        database.pedidos.push(newPedido);
        return res.json({message: 'Pedido modificado'});
    }
    
}

function calcularPrecio(pedido: Pedido): number {
    //usar reduce
    let importe = 0;
    pedido.pizzas.forEach((x => {
        const pizza = database.pizzas.find(y => y.id === x);
        importe = importe + pizza!.precio;
    }));

    const usuario = database.usuarios.find(x => x.id === pedido.idUsuario);

    if (usuario!.siguienteDescuento !== 0) {
        importe = importe - ((importe * usuario!.siguienteDescuento) / 100);
        usuario!.siguienteDescuento = 0;
    }

    if (aplica5(pedido.idUsuario)) {        
        usuario!.siguienteDescuento = 5;
    } else {
        if (aplica15(pedido.id)) {
            usuario!.siguienteDescuento = 15;
        }
    }

    
    return importe;
}

function aplica5(idUsuario: number): boolean {
    let fechaLimite = new Date();
    let sumaImporte = 0;
    //usar reduce
    fechaLimite.setDate(fechaLimite.getDate() - 14);
    const a = database.pedidos.filter(x => x.idUsuario === idUsuario)
    .filter(x => x.fecha.getTime() > fechaLimite.getTime()).forEach((x => {
        sumaImporte = sumaImporte + x.importe;
    })); 
    return sumaImporte > 100;
}

function aplica15(idUsuario: number): boolean {
    let fechaLimite = new Date();
    let sumaImporte = 0;
    //usar reduce
    fechaLimite.setDate(fechaLimite.getDate() - 21);
    const a = database.pedidos.filter(x => x.idUsuario === idUsuario)
    .filter(x => x.fecha.getTime() > fechaLimite.getTime()).forEach((x => {
        sumaImporte = sumaImporte + x.importe;
    }));
    return sumaImporte > 200;

}