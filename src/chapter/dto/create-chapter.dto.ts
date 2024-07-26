import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateChapterDto {
	@ApiProperty({
		example: 'Basics',
		description: 'The name of the chapter.',
		required: true
	})
	@IsString({ message: 'Название главы должно быть строкой' })
	@IsNotEmpty({ message: 'Название главы не может быть пустым' })
	name: string
}
