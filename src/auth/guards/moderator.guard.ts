import {
	CanActivate,
	ExecutionContext,
	ForbiddenException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User, UserRole } from '@prisma/client'

export class OnlyModeratorGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: User }>()
		const user = request.user

		if (user.role !== UserRole.ADMIN && user.role !== UserRole.MODERATOR)
			throw new ForbiddenException('У тебя нет прав!')

		return true
	}
}
