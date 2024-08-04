import { Module } from '@nestjs/common'
import { CourseService } from 'src/course/course.service'
import { PrismaService } from 'src/prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, CourseService],
	exports: [UserModule]
})
export class UserModule {}
