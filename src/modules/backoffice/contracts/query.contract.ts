import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { QueryDTo } from '../dtos/query.dto';


//Tornar uma classe injetável, é diferente de uma classe modelo..
@Injectable()
export default class QueryContract implements Contract {
    
    errors: any[];

    //Função para validar, com parametros do tipo Cliente : verdadeiro/falso
    validate(model: QueryDTo): boolean {
        const flunt = new Flunt();

        if(!model.query){
            model.query = {};
        }

        flunt.isGreterThan(model.take, 500, 'Sua query não pode retornar mais de 500 registros!!!');
        
    
        this.errors = flunt.errors;

        return flunt.isValid();
        /* Essa função retorna um verdadeiro ou falso, então se não tiver um
        erro o return chama o metodo dentro de flunt retornando erro é = 0 */
    }
}