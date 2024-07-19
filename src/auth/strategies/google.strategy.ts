import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('GOOGLE_CLIENT_ID'),
			clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
			callbackURL: configService.get('APP_URL') + '/auth/google/callback',
			scope: ['email', 'profile']
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: VerifyCallback
	) {
		const { name, emails, photos } = profile

		const user = {
			email: emails[0].value,
			name: `${name.givenName} ${name.familyName}`,
			picture: photos[0].value
		}

		done(null, user)
	}
}
