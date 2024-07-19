import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { EmailModule } from './email/email.module'
import { UserModule } from './user/user.module'
import { IS_DEV_ENV } from './utils/is-dev.util'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		AuthModule,
		UserModule,
		EmailModule
	]
})
export class AppModule {}
