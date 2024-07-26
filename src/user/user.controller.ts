import { Controller, Get } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	/**
	 * Получает список всех пользователей.
	 * Доступно только для пользователей с ролью ADMIN.
	 * @returns Массив объектов пользователей, включая данные профиля.
	 */
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
	@Auth()
	@Get('profile')
	async findById(@CurrentUser('id') id: number) {
		return this.userService.findById(id)
	}
}
