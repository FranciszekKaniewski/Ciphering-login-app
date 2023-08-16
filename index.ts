import * as express from 'express'
import {Application} from "express";
import {loginDataRoute} from "./routes/login-data-route";

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
        this.app.listen(3001,'localhost', ()=>{
            console.log('Listening on http://localhost:3001/');
        })
    }
}

new App()