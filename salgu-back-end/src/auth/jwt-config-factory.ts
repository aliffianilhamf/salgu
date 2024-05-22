import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfigFactory = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => {
  return {
    global: true,
    secret: configService.getOrThrow<string>('auth.jwt.secret'),
    signOptions: {
      expiresIn: configService.getOrThrow<string>(
        'auth.jwt.signOptions.expiresIn',
      ),
    },
  };
};
