import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileWriteOptions } from './types';
import { ReadStream } from 'fs';

@Injectable()
export abstract class StorageService {
  constructor(private readonly configService: ConfigService) {}

  abstract saveFile(
    file: Express.Multer.File,
    id: string,
    options?: FileWriteOptions,
  );

  abstract getFile(id: string): ReadStream;

  abstract deleteFile(id: string);

  abstract fileExists(id: string): boolean;
}
