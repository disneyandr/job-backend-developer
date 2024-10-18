import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Resenhas de Filmes')
    .setDescription('Documentação da API para gerenciar resenhas de filmes')
    .setVersion('1.0')
    .addTag('movie-reviews')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // Fim da configuração do Swagger
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
