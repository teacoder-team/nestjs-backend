import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'
import { ProfileEntity } from './profile.entity'

/**
 * Represents a user in the system.
 */
export class UserEntity {
	@ApiProperty({ example: 1, description: 'Unique identifier of the user.' })
	id: number

	@ApiProperty({
		example: 'user@example.com',
		description: 'Email address of the user.'
	})
	email: string

	@ApiProperty({
		enum: UserRole,
		example: UserRole.STUDENT,
		description: 'Role of the user in the system (STUDENT, MODERATOR, ADMIN).'
	})
	role: UserRole

	@ApiPropertyOptional({
		type: () => ProfileEntity,
		description: 'Associated profile of the user.',
		required: false
	})
	profile?: ProfileEntity

	@ApiProperty({
		example: '2024-01-01T00:00:00.000Z',
		description: 'Date when the user was created.'
	})
	createdAt: Date

	@ApiProperty({
		example: '2024-01-02T00:00:00.000Z',
		description: 'Date when the user was last updated.'
	})
	updatedAt: Date
}
