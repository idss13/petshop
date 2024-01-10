export class Address {
    constructor(
        public zipCode: string, //CEP
        public street: string, //rua
        public number: string, //numero
        public complement: string, //complemento
        public neighborhood: string, //bairro
        public city: string, //cidade
        public state: string, //estado
        public country: string, //país

    ) {

    }
}