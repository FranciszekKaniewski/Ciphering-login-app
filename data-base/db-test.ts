import {userDataRecord} from "./records/user-data-record";

(async ()=>{
    console.log(await userDataRecord.getAll());
    console.log(await userDataRecord.getOne('132759bb-3c2a-11ee-94d0-18c04dda4d85'));
})()
