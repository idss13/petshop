import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomLogger } from './shared/services/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {

    /**
     * Metodo para utilizar um Log customizado
     */
    //logger: new CustomLogger(),

  });

  /**
   * Método para comprimir todas as informações da resposta(JSON) da requisição, porque foi importado globalmemte,
   *esse pacote formata as informações para um tipo zipado, e o client ou browser consegue descomprimir o zip.
   */
  app.use(compression());

  //Documentação - Open API
  const options = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('API de estudo NestJS')
    .setVersion('1.0.0')
    .addTag('petshop')
    .build();
    const document = SwaggerModule.createDocument(app, options);
    
    /**
     * Rota para documentação:
     * http://localhost:3000/documento
     */
    SwaggerModule.setup('documento',app,document);


  //Esse método tem que ficar sempre por último
  await app.listen(3000);
}
bootstrap();
