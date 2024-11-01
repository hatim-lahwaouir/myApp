type LoginData = {
    email: string
    password: string
}
import { HOST , PORT} from "../config"



type SingUpData = {
    email: string
    username: string
    password: string
}


const url = `http://${HOST}:${PORT}/api/`




const LoginAction = async (data:LoginData):Promise<any> => {
    const response = await fetch(`${url}authe/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });


    const result = await response.json();
    if (!response.ok)
    {
        return {
            msg : result?.msg,
            ok: false,
        }
    }
    return {
        ok:true,
        data : result,
    }
}


const SignUpAction  = async (data:SingUpData):Promise<any> => {
      const response = await fetch(`${url}authe/sign-up/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        return {
            info : result,
            ok: false,
        }
      }
      return {
        ok:true,
        data : result?.data,
    }

    };



export {SignUpAction, LoginAction};