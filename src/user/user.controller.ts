import { Controller, Get } from '@nestjs/common'
import {
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { UserRole } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserService } from './user.service'

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	/**
	 * Получает список всех пользователей.
	 * Доступно только для пользователей с ролью ADMIN.
	 * @returns Массив объектов пользователей, включая данные профиля.
	 */
	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({
		description:
			'Successful response containing a list of all users with their profile data.'
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized access. This endpoint requires ADMIN role.'
	})
	@Auth(UserRole.ADMIN)
	@Get()
	async findAll() {
		return this.userService.findList()
	}

	/**
	 * Получает профиль текущего пользователя.
	 * @param id - Уникальный идентификатор текущего пользователя, полученный из токена
	 * @returns Объект профиля пользователя
	 */
	@ApiOperation({ summary: 'Get user profile' })
	@ApiParam({
		name: 'id',
		required: true,
		description: 'Unique identifier of the current user'
	})
	@ApiOkResponse({
		description:
			'Successful response containing the profile information of the authenticated user.'
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized access. This endpoint requires authentication.'
	})
	@Auth()
	@Get('profile')
	async findById(@CurrentUser('id') id: number) {
		return this.userService.findById(id)
	}
}
