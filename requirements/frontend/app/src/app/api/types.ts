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

export {SignUpRequest, LoginRequest ,tokens}


