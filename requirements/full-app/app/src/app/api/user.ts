// interfaces 


interface tokens{
    access : string,
    refresh: string,
}

interface LoginRequest {
    usernameOrEmail: string,
    password: string,
}

interface SignUpRequest{
    username : string,
    email : string,
    password : string,
}




const login = async ({usernameOrEmail , password } : LoginRequest) : Promise<tokens | null> =>{

    return null;
}


const SingUp = async ({username , email, password } : SignUpRequest) : Promise <boolean> =>{

    return true;
}