import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCourseDto {
	@ApiProperty({
		example: 'Introduction to Programming',
		description: 'The name of the course.',
		required: true
	})
	@IsString({ message: 'Course name must be a string' })
	@IsNotEmpty({ message: 'Course name cannot be empty' })
	name: string
}
