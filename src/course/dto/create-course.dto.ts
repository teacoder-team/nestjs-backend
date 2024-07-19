import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCourseDto {
	@IsString({ message: 'Название курса должно быть строкой' })
	@IsNotEmpty({ message: 'Название курса не может быть пустым' })
	name: string
}
