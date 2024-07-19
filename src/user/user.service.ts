import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Находит пользователя по его уникальному идентификатору (id).
	 * @param id - Уникальный идентификатор пользователя
	 * @returns Объект пользователя
	 * @throws NotFoundException - Если пользователь не найден
	 */
	async findById(id: number) {
		const user = await this.prisma.user.findUnique({
			where: { id }
		})

		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	/**
	 * Находит пользователя по его email.
	 * @param email - Электронная почта пользователя
	 * @returns Объект пользователя
	 */
	async findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email }
		})
	}

	/**
	 * Создает нового пользователя и связанный профиль в базе данных.
	 * @param user - Данные нового пользователя
	 * @returns Объект созданного пользователя
	 */
	async create(user: any) {
		return this.prisma.user.create({
			data: {
				email: user.email,
				profiles: {
					create: {
						name: user.name,
						picture: user.picture,
						points: 0
					}
				}
			}
		})
	}
}
