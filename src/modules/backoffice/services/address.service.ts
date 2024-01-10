import { Model } from 'mongoose';
import { Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { Address } from '../models/address.model';
import { HttpService } from '@nestjs/axios';
import { catchError, Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { Result } from '../models/result.model';


@Injectable()
export class AddressService {
    constructor(
        @InjectModel('Customer') private readonly customerModel: Model<Customer>,
        private readonly httpService: HttpService
        ){
    }


    //Cria um novo endereço de cobrança
    async cadastrarEnderecoDeCobranca(document: string, data: Address): Promise<Customer> {
        /* Essa variavel recebe uma função que irá verificar se já existe um registro 
        de endereço criado no banco, se não ele executa o await */
        const options = { upsert: true };
        return await this.customerModel.findOneAndUpdate({ document }, {
            //atribuição para atualizar os campos
            $set: {
                billingAddress: data,
            },
        }, options);
    }

    //Cria um novo endereço de entrega
    async cadastrarEnderecoDeEntrega(document: string, data: Address): Promise<Customer> {
        /* Essa variavel recebe uma função que irá verificar se já existe um registro 
        de endereço criado no banco, se não ele executa o await */
        const options = { upsert: true };
        return await this.customerModel.findOneAndUpdate({ document }, {
            //atribuição para atualizar os campos
            $set: {
                shippingAddress: data,
            },
        }, options);
    }

    //Retorna dados do cep via webservice
    // buscaEnderecoPorCEP(cep: string){
    //     return this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`);
    // }

    async buscaEnderecoPorCEP(
        cep: string
    ): Promise<AxiosResponse> {
        // console.log(`https://viacep.com.br/ws/${cep}/json/`);
       const ceplocalizado = await this.httpService
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .toPromise();

        console.log(ceplocalizado);
        return ceplocalizado.data;
    }

}
