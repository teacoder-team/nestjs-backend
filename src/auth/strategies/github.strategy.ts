import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { AuthProvider } from '@prisma/client'
import { Profile, Strategy } from 'passport-github2'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('GITHUB_CLIENT_ID'),
			clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
			callbackURL: configService.get('APP_URL') + '/auth/github/callback',
			scope: ['user:email']
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
			type: AuthProvider.GITHUB
		}

		done(null, user)
	}
}
