import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Address } from 'src/modules/backoffice/models/address.model';


//Tornar uma classe injetável, é diferente de uma classe modelo..
@Injectable()
export default class CreateAddressContract implements Contract {
    
    errors: any[];

    //Função para validar, com parametros do tipo Cliente : verdadeiro/falso
    validate(model: Address): boolean {
        const flunt = new Flunt();

        flunt.isFixedLen(model.zipCode, 8, 'CEP inválido');
        flunt.hasMinLen(model.street,3, 'Rua inválida');
        flunt.hasMinLen(model.neighborhood, 3, 'Bairro inválido!');
        flunt.hasMinLen(model.city, 3, 'Cidade inválida!');
        flunt.isFixedLen(model.state, 2, 'Estado inválido!');
        flunt.isFixedLen(model.country, 3, 'País inválido!');
    
        this.errors = flunt.errors;

        return flunt.isValid();
        /* Essa função retorna um verdadeiro ou falso, então se não tiver um
        erro o return chama o metodo dentro de flunt retornando erro é = 0 */
    }
}