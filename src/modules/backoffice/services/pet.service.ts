import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';


@Injectable()
export class PetService {
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {
    }

    //Cria um novo Pet
    async cadastrarPet(document: string, data: Pet): Promise<Customer> {
        /* O parametro new irá criar um novo registro, incluindo também um novo id */
        const options = { upsert: true, new: true };
        return await this.customerModel.findOneAndUpdate({ document }, {
            /* Uso do 'push' para registrar valores dentro de um array no banco de dados */
            $push: {
                pets: data,
            },
        }, options);

    }

    //Atualiza um Pet por id do documento do Customer e id do Pet
    async atualizarPet(document: string, id: string, data: Pet): Promise<Customer> {
        return await this.customerModel.findOneAndUpdate({ document, 'pets._id': id }, {
            $set: {
                'pets.$': data,
            },
        });
    }


}