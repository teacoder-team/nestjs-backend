import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Получает список всех пользователей из базы данных.
	 * Пользователи сортируются по дате создания в обратном порядке.
	 * @returns Массив объектов пользователей, включая данные профиля.
	 */
	async findList() {
		const users = await this.prisma.user.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				profile: true
			}
		})

		return users
	}

	/**
	 * Получает 10 самых продуктивных пользователей по количеству очков (points).
	 * @returns Массив объектов пользователей, включая данные профиля.
	 */
	async findTopUsersByPoints() {
		const topUsers = await this.prisma.user.findMany({
			select: {
				id: true,
				profile: { select: { name: true, picture: true, points: true } }
			},
			orderBy: { profile: { points: 'desc' } },
			take: 10
		})

		return topUsers
	}

	/**
	 * Находит пользователя по его уникальному идентификатору (id).
	 * @param id - Уникальный идентификатор пользователя
	 * @returns Объект пользователя
	 * @throws NotFoundException - Если пользователь не найден
	 */
	async findById(id: number) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: {
				profile: true
			}
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
				profile: {
					create: {
						name: user.name,
						picture: user.picture,
						provider: user.type
					}
				}
			},
			include: {
				profile: true
			}
		})
	}
}
