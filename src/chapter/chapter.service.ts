import { Injectable, NotFoundException } from '@nestjs/common'
import { CourseService } from 'src/course/course.service'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug.util'
import { v4 as uuidv4 } from 'uuid'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'

@Injectable()
export class ChapterService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly courseService: CourseService
	) {}

	/**
	 * Находит главу по её идентификатору.
	 * @param id - Уникальный идентификатор главы.
	 * @returns Объект главы с указанным идентификатором.
	 * @throws NotFoundException - Если глава с указанным идентификатором не найдена.
	 */
	async findById(id: number) {
		const chapter = await this.prisma.chapter.findUnique({
			where: { id }
		})

		if (!chapter) throw new NotFoundException('Глава не найдена')

		return chapter
	}

	/**
	 * Создает новую главу для указанного курса.
	 * @param dto - Объект данных для создания новой главы.
	 * @param courseId - Уникальный идентификатор курса, к которому относится глава.
	 * @returns Объект с идентификатором созданной главы.
	 */
	async create(dto: CreateChapterDto, courseId: number) {
		await this.courseService.findById(courseId)

		const lastChapter = await this.prisma.chapter.findFirst({
			where: { courseId },
			orderBy: {
				position: 'desc'
			}
		})

		const newPosition = lastChapter ? lastChapter.position + 1 : 1

		const chapter = await this.prisma.chapter.create({
			data: {
				name: dto.name,
				slug: this.generateSlugWithUniqueSuffix(dto.name),
				position: newPosition,
				courseId
			}
		})

		return { id: chapter.id }
	}

	/**
	 * Обновляет существующую главу.
	 * @param id - Уникальный идентификатор главы, которую нужно обновить.
	 * @param dto - Объект данных для обновления главы.
	 * @returns Обновленный объект главы.
	 * @throws NotFoundException - Если глава с указанным идентификатором не найдена.
	 */
	async update(id: number, dto: UpdateChapterDto) {
		await this.findById(id)

		const chapter = await this.prisma.chapter.update({
			where: { id },
			data: {
				...dto,
				slug: this.generateSlugWithUniqueSuffix(dto.name)
			}
		})

		return chapter
	}

	/**
	 * Удаляет главу по её идентификатору.
	 * @param id - Уникальный идентификатор главы, которую нужно удалить.
	 * @returns Объект с идентификатором удаленной главы.
	 * @throws NotFoundException - Если глава с указанным идентификатором не найдена.
	 */
	async delete(id: number) {
		await this.findById(id)

		const chapter = await this.prisma.chapter.delete({
			where: { id }
		})

		return { id: chapter.id }
	}

	/**
	 * Генерирует уникальный slug для главы с добавлением суффикса.
	 * @param name - Имя главы, на основе которого будет сгенерирован slug.
	 * @returns Уникальный slug для главы.
	 */
	private generateSlugWithUniqueSuffix(name: string) {
		const slug = generateSlug(name)
		const uniqueSuffix = uuidv4().split('-')[0]

		return `${slug}-${uniqueSuffix}`
	}
}
