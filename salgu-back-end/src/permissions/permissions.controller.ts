import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { getSubjectAndId } from './utils';
import { GetPermissionDto } from './dto/get-permission.dto';

@ApiTags('permissions')
@Controller(['dirs/:dirId/permissions', 'files/:fileId/permissions'])
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(
    @Body() createPermissionDto: CreatePermissionDto,
    @Param('dirId') dirId?: string,
    @Param('fileId') fileId?: string,
  ) {
    const [subject, subjectId] = getSubjectAndId(dirId, fileId);
    return this.permissionsService.create(
      subject,
      subjectId,
      createPermissionDto,
    );
  }

  @Get()
  @ApiResponse({ type: GetPermissionDto, isArray: true })
  findAll(
    @Param('dirId') dirId?: string,
    @Param('fileId') fileId?: string,
    @Query('includeInherited') includeInherited?: boolean,
  ): Promise<GetPermissionDto[]> {
    const [subject, subjectId] = getSubjectAndId(dirId, fileId);
    return this.permissionsService.findAll(
      subject,
      subjectId,
      includeInherited,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
