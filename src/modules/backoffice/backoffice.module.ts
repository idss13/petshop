

import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { AccountController } from './controllers/account.controller';
import { AddressController } from './controllers/address.controller';
import { CustomerController } from './controllers/customer.controller';
import { PetController } from './controllers/pet.controller';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';
import { AddressService } from './services/address.service';
import { CustomerService } from './services/customer.service';
import { PetService } from './services/pet.service';

@Module({
    imports: [
        
        HttpModule.registerAsync({
            useFactory: () => ({
              timeout: 5000,
              maxRedirects: 5,
            }),
          }),

        CacheModule.register(),
        
        PassportModule.register({ defaultStrategy: 'jwt' }),
        
        JwtModule.register({
            privateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
        }),

        MongooseModule.forFeature([
        {
            name: 'Customer',
            schema: CustomerSchema,
        },

        {
            name: 'User',
            schema: UserSchema,
        },

    ])],
   
    controllers: [ CustomerController,
                    AddressController,
                    PetController,
                    AccountController
                ],
    
                providers: [ 
                AccountService, 
                CustomerService,
                AddressService,
                PetService,
                AuthService,
                JwtStrategy
                ],
})
export class BackofficeModule { }
