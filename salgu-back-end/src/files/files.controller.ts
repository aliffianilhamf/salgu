import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

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

    if (file?.ownerId !== user.id || !user.isAdmin)
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

    if (file?.ownerId !== user.id || !user.isAdmin)
      return new UnauthorizedException();

    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: UserEntity) {
    const file = await this.filesService.findOne(+id);

    if (file?.ownerId !== user.id || !user.isAdmin)
      return new UnauthorizedException();

    return this.filesService.remove(+id);
  }

  @Patch(':id/data')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // TODO: Save file data
    return `File ${file.originalname} uploaded successfully. Feature not available yet.`;
  }

  @Get(':id/data')
  getData(@Param('id') id: string) {
    // TODO: Return raw file data
    return `Data for file id=${id}. Feature not available yet.`;
  }
}
