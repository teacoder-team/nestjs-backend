import { Injectable } from '@nestjs/common'
import { ChapterService } from 'src/chapter/chapter.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class LogCourseService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly chapterService: ChapterService
	) {}

	async progress(userId: number, chapterId: number, isCompleted: boolean) {
		const currentChapter = await this.chapterService.findById(chapterId)

		const logCourse = await this.prisma.logCourse.upsert({
			where: {
				userId_chapterId: {
					userId,
					chapterId
				}
			},
			update: {
				isCompleted
			},
			create: {
				userId,
				chapterId,
				isCompleted
			}
		})

		const nextChapter = await this.prisma.chapter.findFirst({
			where: {
				courseId: currentChapter.courseId,
				position: { gt: currentChapter.position },
				isPublished: true
			},
			orderBy: { position: 'asc' }
		})

		return {
			logCourse,
			nextChapter
		}
	}
}
