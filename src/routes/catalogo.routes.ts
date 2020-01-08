import {Router} from 'express'
const router = Router();

import {getCatalogo} from '../controllers/catalogo.controller'

router.route('/')
    .get(getCatalogo);

export default router;