import {hashSync} from "bcrypt";
const saltRounds = 10;

export const cypher = async (text:string) =>{
    return  hashSync(text, saltRounds);
}