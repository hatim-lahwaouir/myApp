"use server"
import { cookies } from 'next/headers'
import  {SignUpRequest, LoginRequest} from "./types";




const BACKEN_HOST = "http://backend";
const BACKEN_PORT = "8000";




const LoginAction = async (obj : LoginRequest) : Promise<any> =>{
    const url = BACKEN_HOST + ":" + BACKEN_PORT + "/authe/login/";

    const resp = await fetch(url, {
        method : "POST",
        body : JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
            },
    });

    const data = await resp.json();
    const cookieStore = await cookies()
    console.log(data);
    cookieStore.set("tokens" ,JSON.stringify(data?.tokens));
    cookieStore.set("userInfo" , JSON.stringify(data?.userInfo));
    if (resp.status == 200){
        return [true];
    }

    return [false, data?.msg];
}


const SingUpAction = async (obj : SignUpRequest) : Promise <any> =>{

    const url = BACKEN_HOST + ":" + BACKEN_PORT + "/authe/sign-up/";

    const resp = await fetch(url, {
        method : "POST",
        body : JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
            },
    });

    if (resp.status == 200)
        return [200];

    const data = await resp.json();
    return [resp.status, data];


}

const GetUserInfo = () =>{
    const cookieStore = cookies();
    const userInfoCookie = cookieStore.get("userInfo")

    const userInfo =  JSON.parse(userInfoCookie.value);

    return userInfo;
}




export {LoginAction, SingUpAction, GetUserInfo};