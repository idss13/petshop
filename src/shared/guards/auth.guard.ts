import { ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard(){

    //Metodo para testar se a rota pode ser ativada ou não
    canActivate(context: ExecutionContext){
        
        return super.canActivate(context);
    
    }

    //Depois que a requisição foi processada
    handleRequest(erro, user, info){
        if(erro || !user){
            throw erro || new UnauthorizedException();
        }
        return user;
    }

}