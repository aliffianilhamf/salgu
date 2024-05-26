import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LocalStorageService } from './local-storage.service';
import { StorageService } from './storage.service';

export const storageProvider: Provider = {
  provide: StorageService,
  useFactory: (configService: ConfigService) => {
    if (configService.getOrThrow('storage.providers.local.enabled')) {
      return new LocalStorageService(configService);
    }
  },
  inject: [ConfigService],
};
