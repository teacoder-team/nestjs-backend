import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UserRole } from '@prisma/client'
import { Response } from 'express'
import { EmailService } from 'src/email/email.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(
		private readonly jwt: JwtService,
		private readonly userService: UserService,
		private readonly emailService: EmailService,
		private readonly configService: ConfigService
	) {}

	/**
	 * Создает пользователя в базе данных, если его нет, и генерирует токены.
	 * @param user - Пользователь, полученный из социальной сети
	 * @returns Объект с accessToken и refreshToken
	 */
	async validateUser(user: any) {
		const existingUser = await this.userService.findByEmail(user.email)

		if (!existingUser) {
			const newUser = await this.userService.create(user)

			await this.emailService.sendWelcome(newUser.email, newUser.profile.name)

			return this.issueTokens(newUser.id, newUser.role)
		}

		return this.issueTokens(existingUser.id, existingUser.role)
	}

	/**
	 * Получает новые токены на основе refresh токена.
	 * Проверяет действительность токена и генерирует новые токены, если он действителен.
	 * @param refreshToken - Refresh токен для проверки.
	 * @returns Объект с новыми токенами.
	 * @throws UnauthorizedException - Если токен недействителен.
	 */
	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)

		if (!result) throw new UnauthorizedException('Невалидный токен')

		const user = await this.userService.findById(result.id)

		return this.issueTokens(user.id, user.role)
	}

	/**
	 * Генерирует access и refresh токены для пользователя.
	 * @param userId - Уникальный идентификатор пользователя
	 * @param role - Роль пользователя (необязательный параметр)
	 * @returns Объект с accessToken и refreshToken
	 */
	private async issueTokens(userId: number, role?: UserRole) {
		const data = { id: userId, role }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	/**
	 * Добавляет refresh token в ответ и устанавливает cookie.
	 * @param res - Объект ответа Express
	 * @param refreshToken - Refresh token для установки в cookie
	 */
	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: this.configService.get('APP_DOMAIN'),
			expires: expiresIn,
			secure: true,
			sameSite: 'none' // Разрешить отправку cookie с кросс-доменными запросами (в продакшене)
		})
	}

	/**
	 * Удаляет refresh token из ответа, очищая cookie.
	 * @param res - Объект ответа Express
	 */
	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: this.configService.get('APP_DOMAIN'),
			expires: new Date(0),
			secure: true,
			sameSite: 'none' // Разрешить отправку cookie с кросс-доменными запросами (в продакшене)
		})
	}
}
