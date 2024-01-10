import { Controller, Post, Put } from '@nestjs/common';
import { Body, Param, UseInterceptors } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import CreatePetContract from '../contracts/pet/create-pet.contract';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { PetService } from '../services/pet.service';

/* Rota definida para chamar os controllers:
localhost:3000/v1/pets */
@Controller('v1/pets')
export class PetController {

    constructor(
        private readonly service: PetService
    ) {
    }

    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async adicionarPet(@Param('document') document, @Body() model: Pet) {
        //Tratamento de erros na requisiçao
        try {
            await this.service.cadastrarPet(document, model);
            return new Result('Pet cadastrado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível cadastrar seu pet', false, null, error), 400);
        }
    }

    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async atualizarAnimalPet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            await this.service.atualizarPet(document, id, model);
            return new Result('Pet atualizado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível atualizar seu pet', false, null, error), 400);
        }
    }

}