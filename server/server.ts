import * as express from 'express';
import { getTasks, addTask } from './tasks.routes';
import * as bodyParser from 'body-parser';
class ServerApp {
    private _app: express.Express;

    constructor() {
        this._app = express();
        this.middleware();
        this.routes();
    }

    private middleware() {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Content-Type', 'application/json');
            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            } else {
                return next();
            }
        });
    }

    private routes() {
        const router = express.Router();
        router.get('/api/tasks', getTasks);
        router.post('/api/tasks', addTask);
        this._app.use(router);
        // this._app.get('/api/tasks', getTasks);
        // this._app.post('/api/tasks', addTask);
    }

    public startServer() {
        this._app.listen(8090, function () {
            console.log('Server app start listening on port 8090');
        });
    }
}


const serverApp = new ServerApp();


serverApp.startServer();


// export default new App().express;
