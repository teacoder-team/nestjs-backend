import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'
import { WelcomeEmail } from 'emails/welcome.email'

@Injectable()
export class EmailService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService
	) {}

	/**
	 * Отправляет электронное письмо с указанными параметрами.
	 *
	 * @param email - Адрес получателя письма.
	 * @param subject - Тема письма.
	 * @param html - HTML-содержимое письма, которое будет отправлено.
	 * @returns Promise, которое разрешается после завершения отправки письма.
	 */
	sendMail(email: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to: email,
			subject,
			html
		})
	}

	/**
	 * Отправляет приветственное письмо при успешной регистрации пользователя.
	 *
	 * @param email - Адрес получателя приветственного письма.
	 * @param username - Имя пользователя, которое будет отображаться в письме.
	 * @returns Promise, которое разрешается после завершения отправки приветственного письма.
	 */
	async sendWelcome(email: string, username: string) {
		const url = this.configService.get('APP_URL')
		const html = render(WelcomeEmail({ username, url }))

		return this.sendMail(email, 'Успешная регистрация', html)
	}
}
