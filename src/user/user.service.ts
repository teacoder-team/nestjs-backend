import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: number) {
		const user = await this.prisma.user.findUnique({
			where: { id }
		})

		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	async findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email }
		})
	}

	async create(user: any) {
		return this.prisma.user.create({
			data: {
				email: user.email,
				name: user.name,
				picture: user.picture
			}
		})
	}
}
