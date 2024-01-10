import { Controller, Post } from '@nestjs/common';
import { Body, Get, Param, UseInterceptors } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ParseArrayPipe } from '@nestjs/common/pipes';
import { AxiosResponse } from 'axios';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import CreateAddressContract from '../contracts/address/create-address.contract';
import { Address } from '../models/address.model';
import { Result } from '../models/result.model';
import { AddressService } from '../services/address.service';

/* Rota definida para chamar os controllers:
localhost:3000/v1/endereco */
@Controller('v1/endereco')
export class AddressController {

    constructor(
        private readonly addressService: AddressService,
    ) {
    }

    // @Post(':document/cobranca')
    // @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    // async adicionarEnderecoDeCobranca(@Param('document') document, @Body() model: Address) {
    //     //Tratamento de erros na requisiçao
    //     try {
    //         await this.service.cadastrarEnderecoDeCobranca(document, model);
    //         return new Result('O endereço de cobrança foi cadastrado com sucesso!', true, model, null);
    //     } catch (error) {
    //         throw new HttpException(new Result('Não foi possível cadastrar seu endereço de cobrança!', false, null, error), 401);
    //     }
    // }

    // @Post(':document/entrega')
    // @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    // async adicionarEnderecoDeEntrega(@Param('document') document, @Body() model: Address) {
    //     //Tratamento de erros na requisiçao
    //     try {
    //         await this.service.cadastrarEnderecoDeEntrega(document, model);
    //         return new Result('O endereço de entrega foi cadastrado com sucesso!', true, model, 201);
    //     } catch (error) {
    //         throw new HttpException(new Result('Não foi possível cadastrar seu endereço de entrega!', false, null, error), 400);
    //     }
    // }

    //Rota para pesquisar endereço por CEP
    @Get('pesquisar/:zipcode')
    async pesquisarPorCEP(
        @Param('zipcode') zipcode
    ) {
        try {
            const retornoCEP = await this.addressService.buscaEnderecoPorCEP(zipcode);
            return new Result(null, true, retornoCEP, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível localizar seu endereço !', false, null, null),
                HttpStatus.NOT_FOUND);
        }
    }

}