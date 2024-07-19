import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { AuthProvider } from '@prisma/client'
import { Profile, Strategy } from 'passport-discord'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('DISCORD_CLIENT_ID'),
			clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
			callbackURL: configService.get('APP_URL') + '/auth/discord/callback',
			scopes: ['identify', 'email']
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: any
	) {
		const { global_name, email, avatar } = profile

		const user = {
			email,
			name: global_name,
			picture: avatar,
			type: AuthProvider.DISCORD
		}

		done(null, user)
	}
}
