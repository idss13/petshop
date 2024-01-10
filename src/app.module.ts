import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from './modules/store/store.module';
import { AgendaModule } from './modules/agenda/agenda.module';


// O '@' significa um decorador de classe, ou seja, tras e agrega dados de outras classes
@Module({
  imports: [
    
    //Configuração de conexão do banco de dados MongoDB
    MongooseModule.forRoot(
      'mongodb://127.0.0.1/dbestudo',
      {
        user: 'usitalo',
        pass: 'DbMaster0491',
      }
    ),
    
    //Configuração de conexão do banco de dados MySql
    /* TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'store',
        autoLoadEntities: true,
        synchronize: true,
      }), */

    BackofficeModule,
    AgendaModule,
    //StoreModule
  ],
  
  controllers: [],
  
  //Providers são serviços, os arquivos services criados deverão ser importados logo abaixo:
  providers: [],
  
})
export class AppModule {}
