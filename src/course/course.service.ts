import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug.util'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'

@Injectable()
export class CourseService {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Находит список курсов, удовлетворяющих критериям поиска.
	 * @param searchTerm - Строка для поиска по названию или описанию курса.
	 * @returns Список курсов, соответствующих критериям поиска.
	 */
	async findList(seacrhTerm?: string) {
		const seacrhTermQuery = seacrhTerm
			? this.findSearchTermFilter(seacrhTerm)
			: {}

		const courses = await this.prisma.course.findMany({
			where: seacrhTermQuery,
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				chapters: true
			}
		})

		return courses
	}

	/**
	 * Находит курс по уникальному slug.
	 * @param slug - Уникальнас ссылка курса, по которому нужно выполнить поиск.
	 * @returns Объект курса с указанным slug.
	 * @throws NotFoundException - Если курс с указанным slug не найден.
	 */
	async findBySlug(slug: string) {
		const course = await this.prisma.course.findUnique({
			where: { slug, isPublished: true },
			include: {
				chapters: true
			}
		})

		if (!course) throw new NotFoundException('Курс не найден')

		return course
	}

	/**
	 * Находит курс по его идентификатору.
	 * @param id - Уникальный идентификатор курса.
	 * @returns Объект курса с указанным идентификатором.
	 * @throws NotFoundException - Если курс с указанным идентификатором не найден.
	 */
	async findById(id: number) {
		const course = await this.prisma.course.findUnique({
			where: { id },
			include: {
				chapters: true
			}
		})

		if (!course) throw new NotFoundException('Курс не найден')

		return course
	}

	/**
	 * Создает новый курс.
	 * @param dto - Объект данных для создания нового курса.
	 * @returns Объект с идентификатором созданного курса.
	 */
	async create(dto: CreateCourseDto) {
		const course = await this.prisma.course.create({
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			}
		})

		return { id: course.id }
	}

	/**
	 * Обновляет существующий курс.
	 * @param id - Уникальный идентификатор курса, который нужно обновить.
	 * @param dto - Объект данных для обновления курса.
	 * @returns Обновленный объект курса.
	 * @throws NotFoundException - Если курс с указанным идентификатором не найден.
	 */
	async update(id: number, dto: UpdateCourseDto) {
		await this.findById(id)

		const course = await this.prisma.course.update({
			where: {
				id
			},
			data: {
				...dto,
				slug: generateSlug(dto.name)
			}
		})

		return course
	}

	/**
	 * Удаляет курс по его идентификатору.
	 * @param id - Уникальный идентификатор курса, который нужно удалить.
	 * @returns Объект с идентификатором удаленного курса.
	 * @throws NotFoundException - Если курс с указанным идентификатором не найден.
	 */
	async delete(id: number) {
		await this.findById(id)

		const course = await this.prisma.course.delete({
			where: { id }
		})

		return { id: course.id }
	}

	/**
	 * Создает фильтр для поиска курсов по строке поиска.
	 * @param searchTerm - Строка поиска, которую нужно использовать для фильтрации.
	 * @returns Фильтр для поиска курсов по названию или описанию.
	 */
	private findSearchTermFilter(searchTerm: string): Prisma.CourseWhereInput {
		return {
			OR: [
				{
					name: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{
					description: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				}
			]
		}
	}
}
