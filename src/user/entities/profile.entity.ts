import { ApiProperty } from '@nestjs/swagger'
import { AuthProvider } from '@prisma/client' // Import AuthProvider from Prisma

/**
 * Represents a user profile in the system.
 */
export class ProfileEntity {
	@ApiProperty({ example: 1, description: 'Unique identifier of the profile.' })
	id: number

	@ApiProperty({
		example: 'John Doe',
		description: 'Name of the user associated with the profile.'
	})
	name: string

	@ApiProperty({
		example: '/uploads/users/default-avatar.png',
		description: 'URL of the user profile picture.'
	})
	picture: string

	@ApiProperty({
		example: 100,
		description: 'Points associated with the user profile.'
	})
	points: number

	@ApiProperty({
		enum: AuthProvider,
		example: AuthProvider.GOOGLE,
		description:
			'Authentication provider used for the user (GOOGLE, GITHUB, YANDEX, DISCORD).'
	})
	provider: AuthProvider

	@ApiProperty({
		example: '2024-01-01T00:00:00.000Z',
		description: 'Date when the profile was created.'
	})
	createdAt: Date

	@ApiProperty({
		example: '2024-01-02T00:00:00.000Z',
		description: 'Date when the profile was last updated.'
	})
	updatedAt: Date
}
