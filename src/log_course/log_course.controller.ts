import {
	Body,
	Controller,
	HttpCode,
	Param,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { LogCourseDto } from './dto/log_course.dto'
import { LogCourseService } from './log_course.service'

@Controller('log-course')
export class LogCourseController {
	constructor(private readonly logCourseService: LogCourseService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':chapterId')
	async progress(
		@CurrentUser('id') userId: string,
		@Param('chapterId') chapterId: string,
		@Body() dto: LogCourseDto
	) {
		return this.logCourseService.progress(+userId, +chapterId, dto.isCompleted)
	}
}
