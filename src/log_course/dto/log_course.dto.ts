import { IsBoolean } from 'class-validator'

export class LogCourseDto {
	@IsBoolean()
	isCompleted: boolean
}
