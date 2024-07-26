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
import { UserRole } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ChapterService } from './chapter.service'
import { CreateChapterDto } from './dto/create-chapter.dto'

@Controller('chapters')
export class ChapterController {
	constructor(private readonly chapterService: ChapterService) {}

	/**
	 * Получает главу по её идентификатору.
	 * @param id - Уникальный идентификатор главы.
	 * @returns Объект главы с указанным идентификатором.
	 */
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
