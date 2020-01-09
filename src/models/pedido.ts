import { Usuario } from "./usuario";
import { Pizza } from "./pizza";

export class Pedido {
    id!: number;
    idUsuario!: number;
    fecha!: Date;
    pizzas!: number[];
    importe!: number;
};