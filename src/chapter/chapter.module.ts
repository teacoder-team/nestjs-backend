import { Module } from '@nestjs/common'
import { CourseService } from 'src/course/course.service'
import { PrismaService } from 'src/prisma.service'
import { ChapterController } from './chapter.controller'
import { ChapterService } from './chapter.service'

@Module({
	controllers: [ChapterController],
	providers: [ChapterService, PrismaService, CourseService]
})
export class ChapterModule {}
