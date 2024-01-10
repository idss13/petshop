import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

//Injectable é muito importante qunado é utilizado serviços
@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) { }

    /**
     * Funções para atribuir obrigatoriamente os parametros 
     * da classe JwtPayload para criar e validar as informações do token.
     */
    async createToken(document, email, image, roles: string[]) {
        const user: JwtPayload = {
            document: document,
            email: email,
            image: image,
            roles: roles,
        };
        /**
         * Retornando somente o token
         */
        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return payload;
        //return await this.accountService.findOneByUsername(payload);
    }
}