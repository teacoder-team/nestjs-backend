import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { AuthProvider } from '@prisma/client'
import { Profile, Strategy } from 'passport-yandex'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('YANDEX_CLIENT_ID'),
			clientSecret: configService.get('YANDEX_CLIENT_SECRET'),
			callbackURL: configService.get('APP_URL') + '/auth/yandex/callback'
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: any
	) {
		const { displayName, emails, photos } = profile

		const user = {
			email: emails[0].value,
			name: displayName,
			picture: photos[0].value,
			type: AuthProvider.YANDEX
		}

		done(null, user)
	}
}
