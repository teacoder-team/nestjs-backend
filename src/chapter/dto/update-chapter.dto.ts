import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateChapterDto {
	@ApiProperty({
		example: 'Basics',
		description: 'The name of the chapter.',
		required: false
	})
	@IsOptional()
	@IsString({ message: 'Название главы должно быть строкой.' })
	name?: string

	@ApiProperty({
		example: 'This chapter covers the basics of programming.',
		description: 'Description of the chapter.',
		required: false
	})
	@IsOptional()
	@IsString({ message: 'Описание главы должно быть строкой.' })
	description?: string

	@ApiProperty({
		example: 'abcd1234',
		description: 'The ID of the course video on Kinescope.',
		required: false
	})
	@IsOptional()
	@IsString({ message: 'ID видео должен быть строкой.' })
	videoId?: string
}
