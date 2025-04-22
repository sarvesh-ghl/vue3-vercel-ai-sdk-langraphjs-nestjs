import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // Log environment setup
  console.log('Environment setup:', {
    nodeEnv: process.env.NODE_ENV,
    openAiKeyConfigured: !!process.env.OPENAI_API_KEY
  })
  
  // Enable CORS
  app.enableCors()
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe())
  
  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('AI Chat API')
    .setDescription('API documentation for the AI Chat application')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  
  await app.listen(3000)
  console.log('Application is running on: http://localhost:3000')
}
bootstrap() 