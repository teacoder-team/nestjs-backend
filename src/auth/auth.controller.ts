import {
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './guards/google-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Обрабатывает запрос на аутентификацию через Google.
	 * Использует GoogleAuthGuard для проверки аутентификации пользователя.
	 * @param req - Объект запроса, содержащий информацию о пользователе
	 */
	@Get('google')
	@UseGuards(GoogleAuthGuard)
	async googleAuth(@Req() req) {}

	/**
	 * Обрабатывает обратный вызов после аутентификации через Google.
	 * Проверяет пользователя и добавляет refresh token в ответ.
	 * @param req - Объект запроса, содержащий информацию о пользователе
	 * @param res - Объект ответа Express, используемый для отправки ответа клиенту
	 * @returns Объект с информацией о пользователе, включая access token
	 */
	@Get('google/callback')
	@UseGuards(GoogleAuthGuard)
	async googleAuthCallback(
		@Req() req,
		@Res({ passthrough: true }) res: Response
	) {
		const { refreshToken, ...response } = await this.authService.validateUser(
			req.user
		)

		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return response
	}

	/**
	 * Обрабатывает запрос на выход из системы.
	 * Удаляет refresh token из ответа, очищая cookie.
	 * @param res - Объект ответа Express
	 * @returns true - Успешный ответ о выходе из системы
	 */
	@HttpCode(200)
	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		this.authService.removeRefreshTokenFromResponse(res)
		return true
	}
}
