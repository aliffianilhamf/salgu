import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
  StreamableFile,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';
import { UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import AppError from 'src/errors/app-error';
import { DRIVE_CONSTANTS } from 'src/config/constants';

@ApiTags('files')
@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(
    @Body() createFileDto: CreateFileDto,
    @User() user: UserEntity,
  ): Promise<FileEntity> {
    return this.filesService.create(createFileDto, user.id);
  }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.filesService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @User() user: UserEntity) {
    const file = await this.filesService.findOne(+id);

    if (file?.ownerId !== user.id && !user.isAdmin)
      return new UnauthorizedException();

    return file;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFileDto: UpdateFileDto,
    @User() user: UserEntity,
  ) {
    const file = await this.filesService.findOne(+id);

    if (file?.ownerId !== user.id && !user.isAdmin)
      return new UnauthorizedException();

    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: UserEntity) {
    const file = await this.filesService.findOne(+id);

    if (file?.ownerId !== user.id && !user.isAdmin)
      return new UnauthorizedException();

    return this.filesService.remove(+id);
  }

  @Put(':id/data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: DRIVE_CONSTANTS.maxFileSize },
    }),
  )
  updateFileData(
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) return new AppError('No file provided', {}, 'NO_FILE_PROVIDED');

    const fileEntity = this.filesService.findOne(+id);
    if (!fileEntity)
      return new AppError('File not found', { id }, 'FILE_NOT_FOUND');

    return this.filesService.saveFileData(+id, file);
  }

  @Get(':id/data')
  async getFileData(@Param('id') id: string) {
    const file = await this.filesService.findOne(+id);
    if (!file) return new AppError('File not found', { id }, 'FILE_NOT_FOUND');
    if (file.size === 0) return new StreamableFile(Buffer.alloc(0));

    const readStream = this.filesService.getFile(+id);
    return new StreamableFile(readStream);
  }

  @Get(':id/history')
  getFileHistory(@Param('id') file: FileEntity) {
    return this.filesService.findAll(file.id);
  }
}
