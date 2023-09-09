import {pool} from "../pool";
import {User} from "../../types";

import {v4 as uuid} from 'uuid'
import {FieldPacket} from "mysql2";
import {ValidationError} from "../../utils/error";
import {cypher} from "../../utils/cypher";

type UserResult = [User[],FieldPacket[]]

export class userDataRecord implements User{

    id?: string;
    email: string;
    name: string;
    password: string;

    constructor(obj:User) {
        this.id = obj.id ? obj.id : uuid();
        this.email = obj.email;
        this.name = obj.name;
        this.password = obj.password;

        this.Validation();
    }

    public Validation(){
        if (!this.email.includes('@')){
            throw new ValidationError('email have to includes "@" character ' + this.email)
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

    public async addOne(){
        this.Validation();
        const allNames = (await userDataRecord.getAll()).map(e=>e.name)
        if(allNames.filter(e=>e === this.name).length) throw new ValidationError("User with this name is already exist")
        const allEmails = (await userDataRecord.getAll()).map(e=>e.email)
        if(allEmails.filter(e=>e === this.email).length) throw new ValidationError("User with this e-mail is already exist")
        await pool.execute("INSERT INTO `users_data`(`id`, `email`, `name`, `password`) VALUES (:id,:email,:name,:password)", {
            id: this.id,
            email: this.email,
            name: this.name,
            password: await cypher(this.password),
        })
    }
}

