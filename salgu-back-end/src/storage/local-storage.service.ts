import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileWriteOptions } from './types';
import * as fs from 'fs';
import AppError from 'src/errors/app-error';
import * as path from 'path';
import { StorageService } from './storage.service';
import { getProjectRootPath } from 'src/utils/path';

@Injectable()
export class LocalStorageService extends StorageService {
  private rootPath: string;

  constructor(configService: ConfigService) {
    super(configService);

    const storagePath = path.parse(
      configService.getOrThrow('storage.providers.local.path'),
    );

    if (!path.isAbsolute(storagePath.dir)) {
      const currDir = getProjectRootPath();
      if (!currDir)
        throw new AppError(
          'Cannot determine current directory',
          {},
          'CANNOT_DETERMINE_CURRENT_DIRECTORY',
        );
      this.rootPath = path.join(currDir, storagePath.dir, storagePath.base);
    } else {
      this.rootPath = path.join(storagePath.dir, storagePath.base);
    }

    if (!fs.existsSync(this.rootPath)) {
      fs.mkdirSync(this.rootPath, { recursive: true });
    }
  }

  saveFile(file: Express.Multer.File, id: string, options?: FileWriteOptions) {
    const filePath = `${this.rootPath}/${id}`;
    if (options?.overwrite === false && fs.existsSync(filePath)) {
      throw new AppError('File already exists', { id }, 'FILE_ALREADY_EXISTS');
    }

    fs.writeFileSync(filePath, file.buffer);
  }

  getFile(id: string): fs.ReadStream {
    const path = `${this.rootPath}/${id}`;

    if (!fs.existsSync(path)) {
      throw new AppError('File not found', { id }, 'FILE_NOT_FOUND');
    }

    return fs.createReadStream(path);
  }

  deleteFile(id: string) {
    const path = `${this.rootPath}/${id}`;

    if (!fs.existsSync(path)) {
      throw new AppError('File not found', { id }, 'FILE_NOT_FOUND');
    }

    fs.unlinkSync(path);
  }

  fileExists(id: string): boolean {
    return fs.existsSync(`${this.rootPath}/${id}`);
  }
}
