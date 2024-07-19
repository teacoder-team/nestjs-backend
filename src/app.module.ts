import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: process.env['NODE_ENV'] === 'production',
			isGlobal: true
		}),
	]
})

export class AppModule {}
