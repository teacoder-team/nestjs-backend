import { ApiProperty } from '@nestjs/swagger'
import { ChapterEntity } from 'src/chapter/entities/chapter.entitiy'

/**
 * Represents a course in the system.
 */
export class CourseEntity {
	@ApiProperty({ example: 1, description: 'Unique identifier of the course.' })
	id: number

	@ApiProperty({
		example: 'Introduction to Programming',
		description: 'Name of the course.'
	})
	name: string

	@ApiProperty({
		example: 'introduction-to-programming',
		description: 'Unique slug for the course.'
	})
	slug: string

	@ApiProperty({
		example: 'Learn the basics of programming.',
		description: 'Description of the course.',
		required: false
	})
	description?: string | null

	@ApiProperty({
		example: ['feature1', 'feature2'],
		description: 'List of features associated with the course.',
		required: false
	})
	features?: string[] | null

	@ApiProperty({
		example: '/uploads/courses/course.jpg',
		description: 'URL of the course image.',
		required: false
	})
	imageUrl?: string | null

	@ApiProperty({
		example: 'https://example.com/video.mp4',
		description: 'URL of the course video.',
		required: false
	})
	videoUrl?: string | null

	@ApiProperty({
		example: '/uploads/repositories/course.zip',
		description: 'URL of the course repository.',
		required: false
	})
	repositoryUrl?: string | null

	@ApiProperty({
		example: true,
		description: 'Indicates whether the course is published.'
	})
	isPublished: boolean

	@ApiProperty({ example: 100, description: 'Number of views for the course.' })
	views: number

	@ApiProperty({
		type: () => [ChapterEntity],
		description: 'List of chapters associated with the course.',
		required: false
	})
	chapters?: ChapterEntity[]

	@ApiProperty({
		example: '2024-01-01T00:00:00.000Z',
		description: 'Date when the course was created.'
	})
	createdAt: Date

	@ApiProperty({
		example: '2024-01-02T00:00:00.000Z',
		description: 'Date when the course was last updated.'
	})
	updatedAt: Date
}
