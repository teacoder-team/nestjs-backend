import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { UserRole } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ChapterService } from './chapter.service'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'
import { ChapterEntity } from './entities/chapter.entitiy'

@ApiTags('Chapters')
@Controller('chapters')
export class ChapterController {
	constructor(private readonly chapterService: ChapterService) {}

	@Get()
	async findAll() {
		return this.chapterService.findList()
	}

	@Auth()
	@Get('by-slug/:slug')
	async findBySlug(
		@Param('slug') slug: string,
		@CurrentUser('id') userId: string
	) {
		return this.chapterService.findBySlug(slug, +userId)
	}

	/**
	 * Получает главу по её идентификатору.
	 * @param id - Уникальный идентификатор главы.
	 * @returns Объект главы с указанным идентификатором.
	 */
	@ApiOperation({ summary: 'Get chapter by ID' })
	@ApiParam({ name: 'id' })
	@ApiResponse({ status: 200, type: ChapterEntity })
	@ApiNotFoundResponse({
		description: 'Chapter not found with the provided ID.'
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized access. This endpoint requires ADMIN role.'
	})
	@Auth(UserRole.ADMIN)
	@Get('by-id/:id')
	async findById(@Param('id') id: string) {
		return this.chapterService.findById(+id)
	}

	/**
	 * Создает новую главу для указанного курса.
	 * @param dto - Объект данных для создания новой главы.
	 * @param courseId - Уникальный идентификатор курса, к которому относится глава.
	 * @returns Объект с идентификатором созданной главы.
	 */
	@ApiOperation({ summary: 'Create a new chapter' })
	@ApiResponse({ status: 200, type: ChapterEntity })
	@ApiBadRequestResponse({ description: 'Invalid chapter data provided.' })
	@ApiUnauthorizedResponse({
		description: 'Unauthorized access. This endpoint requires ADMIN role.'
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(UserRole.ADMIN)
	@Post(':courseId')
	async create(
		@Body() dto: CreateChapterDto,
		@Param('courseId') courseId: string
	) {
		return this.chapterService.create(dto, +courseId)
	}

	/**
	 * Обновляет существующую главу.
	 * @param id - Уникальный идентификатор главы, которую нужно обновить.
	 * @param dto - Объект данных для обновления главы.
	 * @returns Обновленный объект главы.
	 */
	@ApiOperation({ summary: 'Update an existing chapter' })
	@ApiParam({ name: 'id' })
	@ApiResponse({ status: 200, type: ChapterEntity })
	@ApiNotFoundResponse({
		description: 'Chapter not found with the provided ID.'
	})
	@ApiBadRequestResponse({ description: 'Invalid chapter data provided.' })
	@ApiUnauthorizedResponse({
		description: 'Unauthorized access. This endpoint requires ADMIN role.'
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth(UserRole.ADMIN)
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateChapterDto) {
		return this.chapterService.update(+id, dto)
	}

	/**
	 * Удаляет главу по её идентификатору.
	 * @param id - Уникальный идентификатор главы, которую нужно удалить.
	 * @returns Объект с идентификатором удаленной главы.
	 */
	@ApiOperation({ summary: 'Delete a chapter by ID' })
	@ApiParam({ name: 'id' })
	@ApiResponse({ status: 200, description: 'Chapter successfully deleted.' })
	@ApiNotFoundResponse({
		description: 'Chapter not found with the provided ID.'
	})
	@ApiUnauthorizedResponse({
		description: 'Unauthorized access. This endpoint requires ADMIN role.'
	})
	@HttpCode(200)
	@Auth(UserRole.ADMIN)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.chapterService.delete(+id)
	}
}
