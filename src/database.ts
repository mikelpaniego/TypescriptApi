import { Pizza } from "./models/pizza";
import { Usuario } from "./models/usuario";
import { Pedido } from "./models/pedido";

export abstract class database {
  public static pizzas: Pizza[];
  public static usuarios: Usuario[];
  public static pedidos: Pedido[];
  public static createDb() {
    this.pizzas = [
      {id: 0, nombre: 'Margarita', ingredientes:'Tomate, queso y albahaca', precio:10, tamaño:'Pequeña'},
      {id: 1, nombre: 'Funghi', ingredientes:'Tomate, queso y champiñones', precio:12, tamaño:'Grande'},
      {id: 2, nombre: '4 Quesos', ingredientes:'Tomate, queso y quesos variados', precio:10, tamaño:'Mediana'},
      {id: 3, nombre: 'Barbacoa', ingredientes:'Tomate, queso, carne, cebolla y salsa barbacoa', precio:12, tamaño:'Grande'},
      {id: 4, nombre: 'Prosciutto', ingredientes:'Tomate, queso y jamón', precio:11, tamaño:'Grande'}
    ];
    this.usuarios = [
      {id: 0, nombre: 'Usuario 1', correo: 'usuario1@gmail.com', siguienteDescuento: 0},
      {id: 1, nombre: 'Usuario 2', correo: 'usuario2@gmail.com', siguienteDescuento: 0}
    ];
    this.pedidos = [];
  }

  public static nextPedidoId(): number {
    let result = 0;
    if (this.pedidos.length !== 0) {
      result = Math.max.apply(Math, this.pedidos.map(function(o) { return o.id; })) + 1;
    }     
    return result;
  }

}