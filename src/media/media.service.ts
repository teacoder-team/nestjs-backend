import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'
import { cleanFileName } from './clean-name'
import { IFile, IMediaResponse } from './interfaces/media.interface'

@Injectable()
export class MediaService {
	/**
	 * Сохраняет медиафайлы в указанную папку и возвращает информацию о сохраненных файлах.
	 * @param mediaFiles - Один или несколько медиафайлов для сохранения.
	 * @param folder - Папка для сохранения файлов (по умолчанию 'default').
	 * @returns Массив объектов с информацией о сохраненных файлах.
	 */
	async saveMedia(
		mediaFiles: IFile | IFile[],
		folder = 'default'
	): Promise<IMediaResponse[]> {
		const folderLowerCase = folder.toLowerCase()

		const uploadFolder = `${path}/uploads/${folderLowerCase}`
		await ensureDir(uploadFolder)

		const responses: IMediaResponse[] = []

		for (const file of Array.isArray(mediaFiles) ? mediaFiles : [mediaFiles]) {
			let fileName = file?.originalname || file?.name
			fileName = cleanFileName(fileName)

			const uniqueSuffix = uuidv4().split('-')[0]
			const uniqueFileName = `${uniqueSuffix}-${fileName}`

			await writeFile(`${uploadFolder}/${uniqueFileName}`, file.buffer)

			responses.push({
				url: `/uploads/${folderLowerCase}/${uniqueFileName}`,
				name: uniqueFileName
			})
		}

		return responses
	}
}
