import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from '../contract';
import { Pet } from 'src/modules/backoffice/models/pet.model';


//Tornar uma classe injetável, é diferente de uma classe modelo..
@Injectable()
export default class CreatePetContract implements Contract {
    
    errors: any[];

    //Função para validar, com parametros do tipo Cliente : verdadeiro/falso
    validate(model: Pet): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.name,3,'Nome inválido!')
        flunt.hasMinLen(model.gender, 3, 'E-mail inválido!');
        flunt.hasMinLen(model.kind, 3, 'Tipo inválido!');
        flunt.hasMinLen(model.brand, 3, 'Raça inválido!');
    
        this.errors = flunt.errors;

        return flunt.isValid();
        /* Essa função retorna um verdadeiro ou falso, então se não tiver um
        erro o return chama o metodo dentro de flunt retornando erro é = 0 */
    }
}