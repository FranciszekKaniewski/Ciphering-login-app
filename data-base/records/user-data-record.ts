import {pool} from "../pool";
import {User} from "../../types";

import {v4 as uuid} from 'uuid'
import {FieldPacket} from "mysql2";
import {ValidationError} from "../../utils/error";

type UserResult = [User[],FieldPacket[]]

export class userDataRecord implements User{

    id?: string;
    email: string;
    name: string;
    password: string;

    constructor(obj:User) {
        this.id = obj.id ?? uuid();
        this.email = obj.email;
        this.name = obj.name;
        this.password = obj.password;

        this.Validation();
    }

    private Validation(){
        if (!this.email.includes('@')){
            throw new ValidationError('email have to includes "@" character')
        }
    }

    public static async getAll(){
        const [result] = (await pool.execute("SELECT * FROM `users_data`") as UserResult)

        return result.map(user => new userDataRecord(user))
    }

    public static async getOne(id:string){
        const [[result]] = await pool.execute("SELECT * FROM `users_data` WHERE `id` = :id", {
            id,
        }) as UserResult;

        return new userDataRecord(result)
    }

}

