import { CacheInterceptor, Controller, Get, Post } from '@nestjs/common';
import { Body, Delete, Param, Put, UseInterceptors } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { Md5 } from 'md5-typescript';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import CreditCardContract from '../contracts/customer/create-credit-card.contract';
import CreateCustomerContract from '../contracts/customer/create-customer.contract';
import UpdateCustomerContract from '../contracts/customer/update-customer.contract';
import QueryContract from '../contracts/query.contract';
import { CreateCustomerDto } from '../dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { QueryDTo } from '../dtos/query.dto';
import { CreditCard } from '../models/credit-card.model';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

/* Rota definida para chamar os controllers:
localhost:3000/v1/customers */
@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService,
    ) {
    }

    //metodo utilizado para inserir pelo corpo da requisição
    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    /* Esse método é a rota para criar o usuario e cliente no banco de dados MongoDB */
    async adicionarCliente(@Body() model: CreateCustomerDto) {

        //Tratamento de erros na requisiçao
        try {

            /**
            * Concatenar a senha criptografada com uma senha padrão SALT_KEY definida no banco de dados:
            * `${model.password}${process.env.SALT_KEY}`
            */
            const password = await Md5.init(`${model.password}`);
            
            /**
             * A variavel 'user' está salvando no banco de dados no schema Customer
             */
            const user = await this.accountService.cadastrarUsuario(
                new User(model.document, password, true, ['user'])
            );

            const customer = new Customer(model.name, model.document, model.email, [], null, null, null, user);
            await this.customerService.cadastrarCliente(customer);

            return new Result('Cliente cadastrado com sucesso!', true, model, null);


        } catch (error) {
            //Rollback manual
            throw new HttpException(new Result('Não foi possível realizar seu cadastro!', false, null, error), 400);
        }
    }

    //Rota para retornar todos os resultados de Customers no banco
    @Get()
    @UseInterceptors(CacheInterceptor)
    async buscarTodos() {
        const allCostumers = await this.customerService.pesquisarTodos();
        return new Result(null, true, allCostumers, null);
    }

    //Rota para retornar por parametro
    // localhost:3000/v1/customer/"qualqurr coisa"
    @Get(':document')
    async buscarPorDocumento(
        @Param('document') document: string
    ) {
        return this.customerService.pesquisarID(document);
    }

    //Rota de busca por paginação
    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDTo) {
        const customers = await this.customerService.consulta(model);
        return new Result(null, true, customers, null);
    }

    //Rota para atualizar um cliente informando um documento
    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async atualizarCliente(@Param('document') document, @Body() model: UpdateCustomerDto) {
        try {
            await this.customerService.atualizarCliente(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível atualizar o cliente!', false, null, error), 400);
        }
    }

    //Rota para adicionar um cartao de credito do cliente referenciado pelo documento
    @Post(':document/cartao-credito')
    @UseInterceptors(new ValidatorInterceptor(new CreditCardContract()))
    async cadastrarCartaoCredito(@Param('document') document, @Body() model: CreditCard) {
        //Tratamento de erros na requisiçao
        try {
            await this.customerService.SalvarOuAtualizarCartaoCredito(document, model);
            return new Result('O cartão de crédito foi cadastrado com sucesso!', true, model, 201);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu cartão de crédito!', false, null, error), 400);
        }
    }

    //Rota para deletar um cliente
    @Delete(':document')
    async excluirCliente(@Param('document') document) {
        try {
            await this.customerService.excluirCliente(document);
            return new Result('O cliente foi removido com sucesso!', true, null, null);
        } catch (error) {
            throw new HttpException(new Result(null, false, null, error), 400);
        }
    }
}