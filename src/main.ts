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
  const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
  
  SwaggerModule.setup('docs', app, document, {
    customCssUrl: CSS_URL,
  });

  await app.listen(process.env.DB_PORT ?? 3000);
}
bootstrap();
