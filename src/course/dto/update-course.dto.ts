import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString } from 'class-validator'

export class UpdateCourseDto {
	@ApiProperty({
		example: 'Introduction to Programming',
		description: 'The name of the course.'
	})
	@IsOptional()
	@IsString({ message: 'Course name must be a string.' })
	name: string

	@ApiProperty({
		example: 'Learn the basics of programming.',
		description: 'The description of the course.'
	})
	@IsOptional()
	@IsString({ message: 'Course description must be a string.' })
	description?: string

	@ApiProperty({
		example: ['feature1', 'feature2', 'feature3'],
		description: 'The list of course features.'
	})
	@IsOptional()
	@IsArray({ message: 'Features must be an array.' })
	features?: string[]

	@ApiProperty({
		example: '/uploads/courses/course.jpg',
		description: 'The URL of the course image.'
	})
	@IsOptional()
	@IsString({ message: 'Image URL must be a string.' })
	imageUrl?: string

	@ApiProperty({
		example: 'https://www.youtube.com/watch?v=abcd1234',
		description: 'The YouTube link of the course video.'
	})
	@IsOptional()
	@IsString({ message: 'Video URL must be a string.' })
	videoUrl?: string

	@ApiProperty({
		example: '/uploads/repositories/course.zip',
		description: 'The URL of the course repository.'
	})
	@IsOptional()
	@IsString({ message: 'Repository URL must be a string.' })
	repositoryUrl?: string
}
