import {Request, Response, Router} from "express";
import {userDataRecord} from "../data-base/records/user-data-record";
import {compareSync} from "bcrypt";
import {ValidationError} from "../utils/error";

export class loginDataRoute {
    public readonly router:Router = Router();

    constructor() {
        this.setUpRoutes();
    }

    private setUpRoutes(){
        this.router.get('/user', this.getUserData)
    }

    private getUserData = async (req:Request,res:Response)=> {

        const loginFromUser = req.body.login;
        const passwordFromUser = req.body.password;

        const usersList = await userDataRecord.getAll()

        const user = usersList.filter(user =>
            user.name === loginFromUser || user.email === loginFromUser
        )[0];

        if(user === undefined) throw new ValidationError("Wrong login!")
        if(!compareSync(passwordFromUser, user.password)) throw new ValidationError("Wrong Password!")

        const id = user.id;
        const userData = await userDataRecord.getOne(id)
        delete userData.password;

        res.json(userData)
    }
}