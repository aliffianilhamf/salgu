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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.decorator';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user: UserEntity) {
    if (!user.isAdmin)
      throw new UnauthorizedException(
        'You need to be an admin to access this route',
      );
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserEntity) {
    if (!user.isAdmin && user.id !== +id) throw new UnauthorizedException();
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: UserEntity,
  ) {
    if (!user.isAdmin && user.id !== +id) throw new UnauthorizedException();
    await this.usersService.update(+id, updateUserDto);
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserEntity) {
    if (!user.isAdmin && user.id !== +id) throw new UnauthorizedException();
    return this.usersService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/usage')
  async getUsage(@Param('id') id: string, @User() user: UserEntity) {
    if (!user.isAdmin && user.id !== +id) throw new UnauthorizedException();
    return {
      amount: await this.usersService.getUsage(+id),
    };
  }
}
