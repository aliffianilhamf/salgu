import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DirsService } from './dirs.service';
import { CreateDirDto } from './dto/create-dir.dto';
import { UpdateDirDto } from './dto/update-dir.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dirs')
@Controller('dirs')
export class DirsController {
  constructor(private readonly dirsService: DirsService) {}

  @Post()
  create(@Body() createDirDto: CreateDirDto) {
    return this.dirsService.create(createDirDto);
  }

  @Get()
  findAll() {
    return this.dirsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dirsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirDto: UpdateDirDto) {
    return this.dirsService.update(+id, updateDirDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dirsService.remove(+id);
  }
}
