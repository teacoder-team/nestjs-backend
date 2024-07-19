import { Controller, Get } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	/**
	 * Получает профиль текущего пользователя.
	 * @param id - Уникальный идентификатор текущего пользователя, полученный из токена
	 * @returns Объект профиля пользователя
	 */
	@Auth()
	@Get('profile')
	async getById(@CurrentUser('id') id: number) {
		return this.userService.findById(id)
	}
}
