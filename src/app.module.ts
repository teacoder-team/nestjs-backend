import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { CourseModule } from './course/course.module'
import { EmailModule } from './email/email.module'
import { MediaModule } from './media/media.module'
import { UserModule } from './user/user.module'
import { IS_DEV_ENV } from './utils/is-dev.util'
import { ChapterModule } from './chapter/chapter.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		AuthModule,
		UserModule,
		EmailModule,
		CourseModule,
		MediaModule,
		ChapterModule
	]
})
export class AppModule {}
