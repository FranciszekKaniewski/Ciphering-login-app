import {hashSync} from "bcrypt";
const saltRounds = 10;

export const cypher = async (text:string) =>{

    const hash = hashSync(text, saltRounds);
    console.log(hash)

    return hash
}