import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const bootstrapSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('NestJs Localstack')
    .setDescription('A quick implementation of aws services with localstack')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('v1');
  bootstrapSwagger(app);
  await app.listen(process.env.PORT || 3000);
  console.log(`Application started on port: ${process.env.PORT || 3000}`);
}
bootstrap();
