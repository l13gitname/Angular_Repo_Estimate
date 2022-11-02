export interface MyRequest{
    Username: string;
    Token: string;
    FromBody: any;
}

export interface MyResponse{
    number: number;
    message: string;
    data: any;
}

export interface LogIn{
    Username: string;
    Password: string;
}


