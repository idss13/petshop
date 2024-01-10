import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { UpdateCustomerDto } from '../../dtos/customer/update-customer.dto';
import { Contract } from '../contract';


//Tornar uma classe injetável, é diferente de uma classe modelo..
@Injectable()
export default class UpdateCustomerContract implements Contract {
    
    errors: any[];

    //Função para validar, com parametros do tipo Cliente : verdadeiro/falso
    validate(model: UpdateCustomerDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome inválido!');
    
        this.errors = flunt.errors;

        return flunt.isValid();
        /* Essa função retorna um verdadeiro ou falso, então se não tiver um
        erro o return chama o metodo dentro de flunt retornando erro é = 0 */
    }
}