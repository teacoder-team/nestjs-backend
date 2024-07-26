import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
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
import { ChapterService } from './chapter.service'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { ChapterEntity } from './entities/chapter.entitiy'

@ApiTags('Chapters')
@Controller('chapters')
export class ChapterController {
	constructor(private readonly chapterService: ChapterService) {}

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

	// TODO: Добавить маршруты для обновления и удаления главы
}
