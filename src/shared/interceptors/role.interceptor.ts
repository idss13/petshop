import { Injectable, ExecutionContext, HttpStatus, HttpException, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { Result } from 'src/modules/backoffice/models/result.model';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
    constructor(public roles: string[]) {

    }

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> {

        const payload: JwtPayload = context.switchToHttp().getRequest().user;
        console.log(payload);
        /**
         * Metodo para percorrer todas as permições do role, 
         * iniciando a variavel como falso,
         */
        let hasRole = false;
        payload.roles.forEach((role) => {
            if (this.roles.includes(role))
                hasRole = true;
        });

        /**
         * Se não tiver as permissões no array, vai retornar a classe padrão
         * de erros Result.
         */
        if (!hasRole){
            throw new HttpException(
                new Result('Acesso não autorizado ...', false, null, null),
                HttpStatus.FORBIDDEN);
        }

        return next.handle();
    }


}