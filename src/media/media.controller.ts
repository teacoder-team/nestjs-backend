import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
	UsePipes
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IFile } from './media.interface'
import { MediaService } from './media.service'
import { FileValidationPipe } from './pipes/file-validation.pipe'
import { FolderValidationPipe } from './pipes/folder-validation.pipe'

@ApiTags('Media')
@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	/**
	 * Загружает медиафайлы в указанную папку.
	 * Применяет пайпы для проверки валидности папки и файлов.
	 * @param mediaFiles - Один или несколько медиафайлов для загрузки.
	 * @param folder - Папка для сохранения файлов (опционально).
	 * @returns Массив объектов с информацией о сохраненных файлах.
	 */
	@ApiConsumes('multipart/form-data')
	@ApiQuery({
		name: 'folder',
		required: false,
		description: 'Folder to save the files'
	})
	@ApiOkResponse({
		description: 'Successful response with information about the saved files'
	})
	@UsePipes(new FolderValidationPipe())
	@UseInterceptors(FilesInterceptor('media'))
	@HttpCode(200)
	@Auth(UserRole.ADMIN)
	@Post()
	async uploadMediaFile(
		@UploadedFiles(FileValidationPipe) mediaFiles: IFile | IFile[],
		@Query('folder') folder?: string
	) {
		return this.mediaService.saveMedia(mediaFiles, folder)
	}
}
