import { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { isDev } from 'src/utils/is-dev.util'

export const getMailerConfig = async (
	configService: ConfigService
): Promise<MailerOptions> => ({
	transport: {
		host: configService.get('SMTP_SERVER'),
		port: isDev(configService) ? 25 : 465,
		secure: !isDev(configService),
		auth: {
			user: configService.get('SMTP_LOGIN'),
			pass: configService.get('SMTP_PASSWORD')
		}
	},
	defaults: {
		from: '"TeaCoder" <help@teacoder.ru>'
	}
})
