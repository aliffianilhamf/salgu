import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FileActionsService } from './file-actions.service';
import { CreateFileActionDto } from './dto/create-file-action.dto';
import { UpdateFileActionDto } from './dto/update-file-action.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('file-actions')
@Controller('file-actions')
export class FileActionsController {
  constructor(private readonly fileActionsService: FileActionsService) {}

  @Post()
  create(@Body() createFileActionDto: CreateFileActionDto) {
    return this.fileActionsService.create(createFileActionDto);
  }

  @Get()
  findAll() {
    return this.fileActionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileActionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileActionDto: UpdateFileActionDto,
  ) {
    return this.fileActionsService.update(+id, updateFileActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileActionsService.remove(+id);
  }
}
