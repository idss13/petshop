import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { QueryDTo } from '../dtos/query.dto';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { CreditCard } from '../models/credit-card.model';


@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {
    }

    //cria um novo cliente
    async cadastrarCliente(data: Customer): Promise<Customer> {
        const customer = new this.customerModel(data);
        return await customer.save();
    }

    //Busca todos os registros do Customer
    async pesquisarTodos(): Promise<Customer[]> {
        /* Exemplo para retornar todos e uma exceção no find():
        " -nome da propriedade " */
        return await this.customerModel
            .find({}, 'name email document')
            .sort('name') //ordenar a busca , tipos de ordenação => crescente = name, decrescente = '-name'
            .exec();
    }

    //Busca um registro por um parametro
    async pesquisarID(
        document: string
    ): Promise<Customer[]> {
        return await this.customerModel
            .find({ document })
            .populate('user', 'username -_id')
            .exec();
    }

    //Busca todos os registro e limita por paginação
    async consulta(customerModel: QueryDTo): Promise<Customer[]> {
        return await this.customerModel
            .find(customerModel.query,
                customerModel.fields,
                {
                    skip: customerModel.skip,
                    limit: customerModel.take,
                })
            .sort(customerModel.sort)
            .exec();
    }

    async atualizarCliente(document: string, data: UpdateCustomerDto): Promise<Customer>{
        return await this.customerModel.findOneAndUpdate({document}, data);
        //{name: 'Novo nome'}
    }

    async SalvarOuAtualizarCartaoCredito(document: string, data: CreditCard) : Promise<Customer>{
        const options = {upsert: true};
        return await this.customerModel.findOneAndUpdate({document}, {
            $set: {
                card: data,
            },
        }, options);
    }

    async excluirCliente(document): Promise<Customer>{
        return await this.customerModel.remove({document});
    }
}