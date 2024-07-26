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
import { MediaEntity } from './entities/media.entity'
import { IFile } from './interfaces/media.interface'
import { MediaService } from './media.service'
import { FileValidationPipe } from './pipes/file-validation.pipe'
import { FolderValidationPipe } from './pipes/folder-validation.pipe'

@ApiTags('Media')
@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@ApiConsumes('multipart/form-data')
	@ApiQuery({
		name: 'folder',
		required: false,
		description: 'Folder to save the files'
	})
	@ApiOkResponse({
		description: 'Successful response with information about the saved files',
		type: [MediaEntity]
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
