import {Request, Response, Router} from "express";

export class loginDataRoute {
    public readonly router:Router = Router();

    constructor() {
        this.setUpRoutes();
    }

    private setUpRoutes(){
        this.router.get('/', this.getUserData)
    }

    private getUserData = (req:Request,res:Response)=> {
        res.json({test:'test'})
    }
}