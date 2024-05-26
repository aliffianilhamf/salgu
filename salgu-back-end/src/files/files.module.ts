import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { storageProvider } from 'src/storage/storage.provider';

@Module({
  controllers: [FilesController],
  providers: [FilesService, storageProvider],
  imports: [TypeOrmModule.forFeature([FileEntity])],
})
export class FilesModule {}
