//Arquivo utilizado para modelo de resultados

export class Result {
    constructor(
        public message: string,
        public status: boolean,
        //data --> dados = retornará qualquer tipo
        public data: any, 
        public error: any,
    ) {

    }
}