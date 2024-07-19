import { IsOptional, IsString } from 'class-validator'

export class UpdateCourseDto {
	@IsOptional()
	@IsString({ message: 'Название курса должно быть строкой.' })
	name?: string

	@IsOptional()
	@IsString({ message: 'Описание курса должно быть строкой.' })
	description?: string

	@IsOptional()
	@IsString({ message: 'URL изображения должен быть строкой.' })
	imageUrl?: string

	@IsOptional()
	@IsString({ message: 'URL видео должен быть строкой.' })
	videoUrl?: string

	@IsOptional()
	@IsString({ message: 'URL репозитория должен быть строкой.' })
	repositoryUrl?: string
}
