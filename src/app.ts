import express, {Application} from 'express'
import morgan from 'morgan'

//Routes
import IndexRoutes from './routes/index.routes'
import CatalogoRoutes from './routes/catalogo.routes'
import PedidosRoutes from './routes/pedidos.routes'
import { database } from './database';

export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
        this.dbs();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes(){
        this.app.use(IndexRoutes);
        this.app.use('/catalogo', CatalogoRoutes);
        this.app.use('/pedidos', PedidosRoutes);
    }

    dbs() {
        database.createDb();
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Servidor en el puerto', this.app.get('port'))
    }
}