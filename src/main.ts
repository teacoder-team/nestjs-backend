import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService = app.get(ConfigService)
	const swaggerConfig = new DocumentBuilder()
		.setTitle('TeaCoder API')
		.setVersion('0.1.10-beta')
		.build()

	app.use(cookieParser())
	app.enableCors({
		origin: configService.get('APP_ORIGIN'),
		credentials: true,
		exposedHeaders: ['set-cookie']
	})

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('docs', app, document)

	await app.listen(configService.get('APP_PORT'))
}
bootstrap()
