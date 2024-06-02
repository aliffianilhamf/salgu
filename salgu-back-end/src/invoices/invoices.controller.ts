import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import AppError from 'src/errors/app-error';

@UseGuards(JwtAuthGuard)
@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll(@User() user: UserEntity) {
    return this.invoicesService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.invoicesService.updateInvoice(+id);
    return this.invoicesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @User() user: UserEntity) {
    const invoice = await this.invoicesService.findOne(+id);
    if (!invoice) throw new NotFoundException('Invoice not found');
    if (invoice.userId !== user.id) {
      throw new UnauthorizedException();
    }
    if (!invoice.isFinal) {
      throw new AppError('Invoice is not final yet', 400);
    }

    return this.invoicesService.update(+id, { paid: true });
  }
}
