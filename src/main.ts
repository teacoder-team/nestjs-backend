import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { readFileSync } from 'fs'
import { AppModule } from './app.module'

function getVersion() {
	return JSON.parse(readFileSync('package.json').toString()).version
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService = app.get(ConfigService)
	const swaggerConfig = new DocumentBuilder()
		.setTitle('TeaCoder API')
		.setDescription(
			'This project is a backend for the Teacoder educational platform focused on teaching web development. It is developed using modern technologies to ensure high performance, scalability, and ease of use.'
		)
		.setVersion(getVersion())
		.setContact('TeaCoder Team', 'https://teacoder.ru', 'help@teacoder.ru')
		.addBearerAuth()
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
