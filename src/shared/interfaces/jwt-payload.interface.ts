//Padrao do token, quanto menos informação é melhor no trafego
export interface JwtPayload{
    document: string;
    email: string;
    image: string;
    roles: string[];
}