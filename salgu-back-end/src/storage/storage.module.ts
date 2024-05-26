import { DynamicModule, Module } from '@nestjs/common';
import { storageProvider } from './storage.provider';

@Module({})
export class StorageModule {
  static register(): DynamicModule {
    return {
      module: StorageModule,
      providers: [storageProvider],
      exports: [StorageModule],
    };
  }
}
