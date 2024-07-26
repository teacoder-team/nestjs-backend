import { ApiProperty } from '@nestjs/swagger'

export class MediaEntity {
	@ApiProperty({
		example: '/uploads/courses/course.jpg',
		description: 'URL of the uploaded media file.'
	})
	url: string

	@ApiProperty({
		example: 'course.jpg',
		description: 'Name of the uploaded media file.'
	})
	name: string
}
