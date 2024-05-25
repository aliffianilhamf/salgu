import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { DirsService } from './dirs.service';
import { CreateDirDto } from './dto/create-dir.dto';
import { UpdateDirDto } from './dto/update-dir.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { User } from 'src/users/user.decorator';

@ApiTags('dirs')
@Controller('dirs')
@UseGuards(JwtAuthGuard)
export class DirsController {
  constructor(private readonly dirsService: DirsService) {}

  @Post()
  create(@Body() createDirDto: CreateDirDto, @User() user: UserEntity) {
    return this.dirsService.create(createDirDto, user.id);
  }

  @Get()
  findAll(@Query('path') path: string, @User() user: UserEntity) {
    if (!path) return this.dirsService.findAll(user.id);
    return this.dirsService.findAllByPathPrefix(path, user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @User() user: UserEntity) {
    const dir = await this.dirsService.findOne(+id);
    if (dir.ownerId !== user.id) return new UnauthorizedException();
    return dir;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDirDto: UpdateDirDto,
    @User() user: UserEntity,
  ) {
    const dir = await this.dirsService.findOne(+id);
    if (dir.ownerId !== user.id) return new UnauthorizedException();
    return this.dirsService.update(+id, updateDirDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: UserEntity) {
    const dir = await this.dirsService.findOne(+id);
    if (dir.ownerId !== user.id) return new UnauthorizedException();
    return this.dirsService.remove(+id);
  }
}
