import { Module } from '@nestjs/common'
import { ChapterModule } from 'src/chapter/chapter.module'
import { PrismaService } from 'src/prisma.service'
import { LogCourseController } from './log_course.controller'
import { LogCourseService } from './log_course.service'

@Module({
	imports: [ChapterModule],
	controllers: [LogCourseController],
	providers: [LogCourseService, PrismaService]
})
export class LogCourseModule {}
