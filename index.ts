import * as express from 'express'
import 'express-async-errors';
import {Application} from "express";
import {loginDataRoute} from "./routes/login-data-route";
import {handleError} from "./utils/error";

export class App {
    private app: Application;

    constructor() {
        this.configApp();
        this.setRoutes();
        this.run();
    }

    private configApp():void{
        this.app = express();

        this.app.use(express.json());
    }

    private setRoutes(){
        this.app.use("/", new loginDataRoute().router);
    }

    private run(){
        this.app.use(handleError);
        this.app.listen(3001,'localhost', ()=>{
            console.log('Listening on http://localhost:3001/');
        })
    }
}

new App()