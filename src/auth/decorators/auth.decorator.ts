import { applyDecorators, UseGuards } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { OnlyAdminGuard } from '../guards/admin.guard'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { OnlyModeratorGuard } from '../guards/moderator.guard'

export const Auth = (role: UserRole = 'STUDENT') =>
	applyDecorators(
		role === UserRole.ADMIN
			? UseGuards(JwtAuthGuard, OnlyAdminGuard)
			: role === UserRole.MODERATOR
				? UseGuards(JwtAuthGuard, OnlyModeratorGuard)
				: UseGuards(JwtAuthGuard)
	)
