/*Flunt é uma forma de implementar um padrão 
de notificações(restrições) na aplicação para concentrar erros e 
mudanças em determinadas ações e entidades.*/

export class Flunt {
    constructor(public errors: any[] = []) { }

    //Metodo se é requirido
    isRequired(valor, mensagem) {
        if (!valor || valor.length <= 0) {
            this.errors.push(mensagem);
        }
    }

    //Metodo para validar o minimo de caracteres
    hasMinLen = (valor, min, mensagem) => {
        if (!valor || valor.length < min) {
            this.errors.push(mensagem);
        }
    }

    ////Metodo para validar o maximo de caracteres
    hasMaxLen = (valor, max, mensagem) => {
        if (!valor || valor.length > max) {
            this.errors.push(mensagem);
        }
    }

    ////Metodo para validar o tamanho fixo de caracteres
    isFixedLen = (valor, tamanho, mensagem) => {
        if (valor.length !== tamanho) {
            this.errors.push(mensagem);
        }
    }

    //Metodo regular expression ->  verificar se é realmente um email valido
    isEmail = (valor, mensagem) => {
        const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(valor)) {
            this.errors.push(mensagem);
        }
    }
    
    //Metodo para validar um cpf - PROCURAR IMPLEMENTAÇÃO EM TYPESCRIPT
    isCpf(){

    }

    //Metodo para limpar os erros
    clear() {
        this.errors = [];
    }

    //Metodo para validar
    isValid() {
        return this.errors.length == 0;
    }


    isGreterThan = (valorA, valorB, mensagem) => {
        if(valorA > valorB){
            this.errors.push(mensagem);
        }
    }

    //Ex.: metodo comparar duas datas
    isDateGreterThan(data1,data2,message){

    }

}

