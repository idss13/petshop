import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from '../contract';
import { CreditCard } from '../../models/credit-card.model';


//Tornar uma classe injetável, é diferente de uma classe modelo..
@Injectable()
export default class CreditCardContract implements Contract {
    
    errors: any[];

    //Função para validar, com parametros do tipo Cliente : verdadeiro/falso
    validate(model: CreditCard): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.holder, 5, 'Nome no cartão inválido!');
        flunt.isFixedLen(model.number,16,'Número do cartão inválido');
        flunt.isFixedLen(model.expiration, 4, 'Data de expiração do cartão inválida!');
    
        this.errors = flunt.errors;

        return flunt.isValid();
        /* Essa função retorna um verdadeiro ou falso, então se não tiver um
        erro o return chama o metodo dentro de flunt retornando erro é = 0 */
    }
}