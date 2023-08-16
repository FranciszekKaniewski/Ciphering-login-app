export interface User{
    id:string;
    name:string;
    email:string;
    password:string;
}
export interface newUser extends User{
    id?:string
}