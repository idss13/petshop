import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { Body, Post, Req, UseGuards } from '@nestjs/common/decorators';
import { Guid } from 'guid-typescript';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { AuthService } from 'src/shared/services/auth.service';
import { AuthenticateDto } from '../dtos/account/authenticate.dto';
import { ChangePasswordDto } from '../dtos/account/change-password.dto';
import { ResetPasswordDto } from '../dtos/account/reset-password.dto';
import { Result } from '../models/result.model';
import { AccountService } from '../services/account.service';


/* Rota definida para chamar os controllers:
localhost:3000/v1/accounts */
@Controller('v1/accounts')
export class AccountController {

    constructor(
        private authService: AuthService,
        private accountService: AccountService

    ) {
    }

    // Rota para Autenticar - localhost:3000/v1/account/login
    @Post('login')
    async autenticarLogin(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.autenticarUsuario(model.username, model.password);

        // Caso não encontre o usuário
        if (!customer)
            throw new HttpException(new Result('Usuário ou senha inválidos', false, null, null),
                HttpStatus.UNAUTHORIZED);

        // Caso o usuário esteja inativo
        if (!customer.user.active)
            throw new HttpException(new Result('Usuário inativo', false, null, null),
                HttpStatus.NOT_FOUND);

        //Gera o TOKEN
        const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
        return new Result(null, true, {
            name: customer.name,
            token: token
        }, null);
    }

    //Rota para resetar senha do usuario
    @Post('reset-senha')
    async resetSenha(@Body() model: ResetPasswordDto): Promise<any> {
        try {
            // LOGO ABAIXO UM SERVIÇO DE ENVIAR EMAIL COM A SENHA TEMPORARIA

            /**
             * Gerando uma senha que será armazenada na variavel password, 
             * através do pacote do npm --> GUI-typescript
             */
            const password = Guid.create().toString().substring(0, 6);

            await this.accountService.atualizarUsuario(model.document, { password: password });
            return new Result('Uma nova senha foi enviada para seu E-mail !', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível restaurar sua senha !', false, null, null),
                HttpStatus.NOT_FOUND);
        }
    }

    //Rota para alterar a senha do usuario
    @Post('alterar-senha')
    @UseGuards(JwtAuthGuard)
    async alterarSenha(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            //ABAIXO UM METODO PARA ENCRIPTAR A SENHA

            /**
             * Alterar a senha pegando a variavel document do usuario já autenticado e criando uma nova senha 
             */
            await this.accountService.atualizarUsuario(request.user.document, { password: model.newPassword });

            return new Result('Sua senha foi alterada com sucesso !', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível alterar a senha', false, null, null),
                HttpStatus.NOT_FOUND);
        }
    }

    //Rota Refresh do Token
    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Req() request): Promise<any> {
        //Gera o TOKEN
        const token = await this.authService.createToken(
            request.user.document, 
            request.user.email, 
            request.user.image,
            request.user.roles
            );
        return new Result(null, true, token, null);
    }
}

