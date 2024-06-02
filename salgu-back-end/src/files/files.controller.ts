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
  NotFoundException,
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
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { PermissionsService } from 'src/permissions/permissions.service';
import { FileActionsService } from './file-actions/file-actions.service';

@ApiTags('files')
@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly permissionsService: PermissionsService,
    private readonly abilityFactory: CaslAbilityFactory,
    private readonly fileActionsService: FileActionsService,
  ) {}

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
    const file = await this.filesService.findOneWithPermissions(+id);
    if (!file) throw new NotFoundException();

    const ability = this.abilityFactory.createForUser(user);
    if (!ability.can('read', file)) throw new UnauthorizedException();

    return file;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFileDto: UpdateFileDto,
    @User() user: UserEntity,
  ) {
    const file = await this.filesService.findOneWithPermissions(+id);
    if (!file) throw new NotFoundException();

    const ability = this.abilityFactory.createForUser(user);
    if (!ability.can('update', file)) throw new UnauthorizedException();

    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: UserEntity) {
    const file = await this.filesService.findOneWithPermissions(+id);
    if (!file) throw new NotFoundException();

    const ability = this.abilityFactory.createForUser(user);
    if (!ability.can('delete', file)) throw new UnauthorizedException();

    return this.filesService.remove(+id);
  }

  @Put(':id/data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: DRIVE_CONSTANTS.maxFileSize },
    }),
  )
  async updateFileData(
    @Param('id') id: string,
    @User() user: UserEntity,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const fileEntity = await this.filesService.findOneWithPermissions(+id);
    if (!fileEntity) throw new NotFoundException();

    const ability = this.abilityFactory.createForUser(user);
    if (!ability.can('update', fileEntity)) throw new UnauthorizedException();

    if (!file) throw new AppError('No file provided', {}, 'NO_FILE_PROVIDED');

    return this.filesService.saveFileData(+id, file);
  }

  @Get(':id/data')
  async getFileData(@Param('id') id: string, @User() user: UserEntity) {
    const fileEntity = await this.filesService.findOneWithPermissions(+id);
    if (!fileEntity) throw new NotFoundException();

    const ability = this.abilityFactory.createForUser(user);
    if (!ability.can('read', fileEntity)) throw new UnauthorizedException();

    if (fileEntity.size === 0) return new StreamableFile(Buffer.alloc(0));

    const readStream = this.filesService.getFile(+id);
    return new StreamableFile(readStream);
  }

  @Get(':id/history')
  async getFileHistory(@Param('id') id: string, @User() user: UserEntity) {
    const fileEntity = await this.filesService.findOneWithPermissions(+id);
    if (!fileEntity) throw new NotFoundException();

    const ability = this.abilityFactory.createForUser(user);
    if (!ability.can('read', fileEntity)) throw new UnauthorizedException();

    return this.filesService.getFileHistory(+id);
  }
}
