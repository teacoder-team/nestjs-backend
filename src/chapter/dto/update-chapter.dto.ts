import { IsOptional, IsString } from 'class-validator'

export class UpdateChapterDto {
	@IsOptional()
	@IsString({ message: 'Название главы должно быть строкой.' })
	name?: string

	@IsOptional()
	@IsString({ message: 'Описание главы должно быть строкой.' })
	description?: string

	@IsOptional()
	@IsString({ message: 'URL видео должен быть строкой.' })
	videoUrl?: string
}
