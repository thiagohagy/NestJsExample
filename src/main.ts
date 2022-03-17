import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  })

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Car dealer API')
      .setDescription('The cars dealer API description')
      .setVersion('1.0')
      .build(),
  )

  app.useGlobalPipes(new ValidationPipe())

  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
