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
  NotFoundException,
} from '@nestjs/common';
import { DirsService } from './dirs.service';
import { CreateDirDto } from './dto/create-dir.dto';
import { UpdateDirDto } from './dto/update-dir.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { User } from 'src/users/user.decorator';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

@ApiTags('dirs')
@Controller('dirs')
@UseGuards(JwtAuthGuard)
export class DirsController {
  constructor(
    private readonly dirsService: DirsService,
    private readonly abilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  create(@Body() createDirDto: CreateDirDto, @User() user: UserEntity) {
    return this.dirsService.create(createDirDto, user.id);
  }

  @Get()
  async findAll(
    @Query('path') path: string,
    @Query('recursive') isRecursive: boolean,
    @User() user: UserEntity,
  ) {
    if (!path) return this.dirsService.findAll(user.id);
    if (isRecursive) return this.dirsService.findAllByPathPrefix(path, user.id);
    return [await this.dirsService.findOneByPath(path, user.id)];
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @User() user: UserEntity) {
    const dir = await this.dirsService.findOneWithPermissions(+id);
    if (!dir) return new NotFoundException();

    const ability = this.abilityFactory.createForUser(user);
    if (!ability.can('read', dir)) return new UnauthorizedException();

    return dir;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDirDto: UpdateDirDto,
    @User() user: UserEntity,
  ) {
    const dir = await this.dirsService.findOneWithPermissions(+id);
    if (!dir) return new NotFoundException();

    const ability = this.abilityFactory.createForUser(user);
    if (!ability.can('update', dir)) return new UnauthorizedException();

    return this.dirsService.update(+id, updateDirDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: UserEntity) {
    const dir = await this.dirsService.findOneWithPermissions(+id);
    if (!dir) return new NotFoundException();

    const ability = this.abilityFactory.createForUser(user);
    if (!ability.can('delete', dir)) return new UnauthorizedException();

    return this.dirsService.remove(+id);
  }
}
