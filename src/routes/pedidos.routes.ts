import {Router} from 'express'
const router = Router();

import {getPedidos, createPedido, deletePedido, updatePedido} from '../controllers/pedidos.controller'

router.route('/')
    .get(getPedidos)
    .post(createPedido);

router.route('/:idPedido')
    .put(updatePedido)
    .delete(deletePedido)

export default router;