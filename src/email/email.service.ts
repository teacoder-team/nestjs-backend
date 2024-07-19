import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) {}

	/**
	 * Отправляет электронное письмо с указанными параметрами.
	 * @param to - Адрес получателя письма.
	 * @param subject - Тема письма.
	 * @param html - HTML содержимое письма.
	 * @returns Promise с результатом отправки письма.
	 */
	sendEmail(to: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to,
			subject,
			html
		})
	}

	/**
	 * Отправляет приветственное письмо при успешной регистрации.
	 * @param to - Адрес получателя приветственного письма.
	 * @returns Promise с результатом отправки письма.
	 */
	sendWelcome(to: string) {
		return this.sendEmail(to, 'Успешная регистрация', '<p>Спасибо</p>')
	}
}
