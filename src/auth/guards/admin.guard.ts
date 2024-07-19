import {
	CanActivate,
	ExecutionContext,
	ForbiddenException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User, UserRole } from '@prisma/client'

export class OnlyAdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: User }>()
		const user = request.user

		if (user.role !== UserRole.ADMIN)
			throw new ForbiddenException('У тебя нет прав!')

		return true
	}
}
