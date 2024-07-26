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
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { UserRole } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CourseService } from './course.service'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { CourseEntity } from './entities/course.entitiy'

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
	constructor(private readonly courseService: CourseService) {}

	/**
	 * Получает список курсов с учетом строки поиска.
	 * @param searchTerm - Строка для поиска по названию или описанию курса.
	 * @returns Список курсов, удовлетворяющих критериям поиска.
	 */
	@ApiOperation({ summary: 'Get list of courses' })
	@ApiQuery({ name: 'searchTerm', required: false })
	@ApiResponse({ status: 200, type: [CourseEntity] })
	@Get()
	async findAll(@Query('seacrhTerm') seacrhTerm?: string) {
		return this.courseService.findList(seacrhTerm)
	}

	/**
	 * Получает курс по уникальному slug.
	 * @param slug - Уникальная сслыкв курса для курса.
	 * @returns Объект курса с указанным slug.
	 */
	@ApiOperation({ summary: 'Get course by slug' })
	@ApiParam({ name: 'slug' })
	@ApiResponse({ status: 200, type: CourseEntity })
	@ApiNotFoundResponse({
		description: 'Course not found with the provided slug.'
	})
	@Get('by-slug/:slug')
	async findBySlug(@Param('slug') slug: string) {
		return this.courseService.findBySlug(slug)
	}

	/**
	 * Получает курс по уникальному идентификатору.
	 * @param id - Уникальный идентификатор курса для поиска.
	 * @returns Объект курса с указанным идентификатором.
	 */
	@ApiOperation({ summary: 'Get course by id' })
	@ApiParam({ name: 'id' })
	@ApiResponse({ status: 200, type: CourseEntity })
	@ApiNotFoundResponse({
		description: 'Course not found with the provided ID.'
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized access. This endpoint requires ADMIN role.'
	})
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
	@ApiOperation({ summary: 'Create a new course' })
	@ApiResponse({ status: 200, type: CourseEntity })
	@ApiBadRequestResponse({ description: 'Invalid course data provided.' })
	@ApiUnauthorizedResponse({
		description: 'Unauthorized access. This endpoint requires ADMIN role.'
	})
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
	@ApiOperation({ summary: 'Update an existing course' })
	@ApiParam({ name: 'id' })
	@ApiResponse({ status: 200, type: CourseEntity })
	@ApiNotFoundResponse({
		description: 'Course not found with the provided ID.'
	})
	@ApiBadRequestResponse({ description: 'Invalid course data provided.' })
	@ApiUnauthorizedResponse({
		description: 'Unauthorized access. This endpoint requires ADMIN role.'
	})
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
	@ApiOperation({ summary: 'Delete a course by ID' })
	@ApiParam({ name: 'id' })
	@ApiResponse({ status: 200, description: 'Course successfully deleted.' })
	@ApiNotFoundResponse({
		description: 'Course not found with the provided ID.'
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized access. This endpoint requires ADMIN role.'
	})
	@HttpCode(200)
	@Auth(UserRole.ADMIN)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.courseService.delete(+id)
	}
}
