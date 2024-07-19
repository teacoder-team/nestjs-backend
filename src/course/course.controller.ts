import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CourseService } from './course.service'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'

@Controller('courses')
export class CourseController {
	constructor(private readonly courseService: CourseService) {}

	/**
	 * Получает список курсов с учетом строки поиска.
	 * @param searchTerm - Строка для поиска по названию или описанию курса.
	 * @returns Список курсов, удовлетворяющих критериям поиска.
	 */
	@Get()
	async findAll(@Query('seacrhTerm') seacrhTerm?: string) {
		return this.courseService.findList(seacrhTerm)
	}

	/**
	 * Получает курс по уникальному slug.
	 * @param slug - Уникальная сслыкв курса для курса.
	 * @returns Объект курса с указанным slug.
	 */
	@Get('by-slug/:slug')
	async findBySlug(@Param('slug') slug: string) {
		return this.courseService.findBySlug(slug)
	}

	/**
	 * Получает курс по уникальному идентификатору.
	 * @param id - Уникальный идентификатор курса для поиска.
	 * @returns Объект курса с указанным идентификатором.
	 */
	@Auth(UserRole.ADMIN)
	@Get('by-id/:id')
	async findById(@Param('id') id: string) {
		return this.courseService.findById(+id)
	}

	/**
	 * Создает новый курс.
	 * @param dto - Объект данных для создания нового курса.
	 * @returns Объект с идентификатором созданного курса.
	 */
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(UserRole.ADMIN)
	@Post()
	async create(@Body() dto: CreateCourseDto) {
		return this.courseService.create(dto)
	}

	/**
	 * Обновляет существующий курс.
	 * @param id - Уникальный идентификатор курса, который нужно обновить.
	 * @param dto - Объект данных для обновления курса.
	 * @returns Обновленный объект курса.
	 */
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(UserRole.ADMIN)
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
		return this.courseService.update(+id, dto)
	}

	/**
	 * Удаляет курс по его идентификатору.
	 * @param id - Уникальный идентификатор курса, который нужно удалить.
	 * @returns Объект с идентификатором удаленного курса.
	 */
	@HttpCode(200)
	@Auth(UserRole.ADMIN)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.courseService.delete(+id)
	}
}
