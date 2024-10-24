import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsageSnapshotsService } from './usage-snapshots.service';
import { CreateUsageSnapshotDto } from './dto/create-usage-snapshot.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Usage Snapshots')
@Controller('usage-snapshots')
@UseGuards(JwtAuthGuard)
export class UsageSnapshotsController {
  constructor(private readonly usageSnapshotsService: UsageSnapshotsService) {}

  @Post()
  create(@Body() createUsageSnapshotDto: CreateUsageSnapshotDto) {
    return this.usageSnapshotsService.create(createUsageSnapshotDto);
  }

  @Get()
  findAll() {
    return this.usageSnapshotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usageSnapshotsService.findOne(+id);
  }
}
