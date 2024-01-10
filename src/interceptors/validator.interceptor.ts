import { ExecutionContext, HttpStatus, NestInterceptor, CallHandler } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { Observable } from 'rxjs/internal/Observable';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Result } from 'src/modules/backoffice/models/result.model';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor{
    constructor(public contract: Contract){

    }

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> {
        
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        //console.log(body);

        if(!valid){
            throw new HttpException(
                new Result(
                'Ops, algo saiu errado!',
                false,
                null,
                this.contract.errors),
                HttpStatus.BAD_REQUEST);
        }

        return next.handle();
    }

    // intercept(context: ExecutionContext, call$: Observable<any>) : Observable<any>{
    //     const body = context.switchToHttp().getRequest().body;
    //     const valid = this.contract.validate(body);

    //     if(!valid){
    //         throw new HttpException(
    //             new Result(
    //             'Ops, algo saiu errado!',
    //             false,
    //             null,
    //             this.contract.errors),
    //             HttpStatus.BAD_REQUEST);
    //     }

    //     return call$;
    // }
}