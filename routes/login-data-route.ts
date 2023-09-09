import {Request, Response, Router} from "express";
import {userDataRecord} from "../data-base/records/user-data-record";
import {compareSync} from "bcrypt";
import {ValidationError} from "../utils/error";
import {User} from "../types";

export class loginDataRoute {
    public readonly router:Router = Router();

    constructor() {
        this.setUpRoutes();
    }

    private setUpRoutes(){
        this.router.get('/user/:id', this.getUserData)
        this.router.post('/user/register', this.registerNewUser)
    }

    private getUserData = async (req:Request,res:Response)=> {

        const loginFromUser = req.body.login;
        const passwordFromUser = req.body.password;

        if(!(loginFromUser && passwordFromUser)){
            throw new ValidationError('You have no access to this account information, pleas check you are logged in.')
        }

        const user = await userDataRecord.getOne(req.params.id)

        if(loginFromUser !== user.email && loginFromUser !== user.name) throw new ValidationError("Wrong login!")
        if(!compareSync(passwordFromUser, user.password)) throw new ValidationError("Wrong Password!")

        const userDataToShow = user;
        delete userDataToShow.password;

        res.json(userDataToShow);
    }

    private registerNewUser = async (req:Request,res:Response) =>{
        const {email,name,password} = req.body
        const userData:User = {email,name,password};
        const newUser = new userDataRecord(userData);
        await newUser.addOne();
        res.end();
    }
}