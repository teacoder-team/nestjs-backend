import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CourseController } from './course.controller'
import { CourseService } from './course.service'

@Module({
	controllers: [CourseController],
	providers: [CourseService, PrismaService]
})
export class CourseModule {}
