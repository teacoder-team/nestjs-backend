import { ApiProperty } from '@nestjs/swagger'

/**
 * Represents a chapter of a course in the system.
 */
export class ChapterEntity {
	@ApiProperty({ example: 1, description: 'Unique identifier of the chapter.' })
	id: number

	@ApiProperty({ example: 'Basics', description: 'Name of the chapter.' })
	name: string

	@ApiProperty({
		example: 'basics',
		description: 'Unique slug for the chapter.'
	})
	slug: string

	@ApiProperty({
		example: 'This chapter covers the basics of programming.',
		description: 'Description of the chapter.',
		required: false
	})
	description?: string | null

	@ApiProperty({
		example: 'abcd1234',
		description: 'The ID of the course video on Kinescope.',
		required: false
	})
	videoId?: string | null

	@ApiProperty({
		example: 1,
		description: 'Position of the chapter within the course.'
	})
	position: number

	@ApiProperty({
		example: true,
		description: 'Indicates whether the chapter is published.'
	})
	isPublished: boolean

	@ApiProperty({
		example: 1,
		description: 'Unique identifier of the associated course.',
		required: false
	})
	courseId?: number | null

	@ApiProperty({
		example: '2024-01-01T00:00:00.000Z',
		description: 'Date when the chapter was created.'
	})
	createdAt: Date

	@ApiProperty({
		example: '2024-01-02T00:00:00.000Z',
		description: 'Date when the chapter was last updated.'
	})
	updatedAt: Date
}
