import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform
} from '@nestjs/common'

const allowedFolders = ['default', 'users', 'courses', 'repositories', 'email']

/**
 * Пайп для проверки валидности имени папки для загрузки файлов.
 */
@Injectable()
export class FolderValidationPipe implements PipeTransform {
	/**
	 * Проверяет, является ли имя папки допустимым.
	 * @param value - Имя папки для проверки.
	 * @param metadata - Дополнительная информация о параметре.
	 * @returns Исходное значение, если имя папки валидно.
	 * @throws BadRequestException - Если имя папки невалидно.
	 */
	transform(value: any, metadata: ArgumentMetadata) {
		if (
			metadata.type === 'query' &&
			value &&
			!allowedFolders.includes(value?.toLowerCase())
		)
			throw new BadRequestException(`Невалидное имя для папки: ${value}`)

		return value
	}
}
