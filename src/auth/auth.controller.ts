import {
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards
} from '@nestjs/common'
import { Request, Response } from 'express'
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
	 * Получает новые access и refresh токены на основе refresh токена из cookies.
	 * Если токен валиден, генерирует новые токены и добавляет refresh токен в ответ.
	 * @param req - Объект запроса.
	 * @param res - Объект ответа Express.
	 * @returns Объект с новыми токенами.
	 * @throws UnauthorizedException - Если refresh токен отсутствует или недействителен.
	 */
	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshTokenFromCookies =
			req.cookies[this.authService.REFRESH_TOKEN_NAME]

		if (!refreshTokenFromCookies) {
			this.authService.removeRefreshTokenFromResponse(res)
			throw new UnauthorizedException('Refresh токен не прошёл')
		}

		const { refreshToken, ...response } = await this.authService.getNewTokens(
			refreshTokenFromCookies
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
