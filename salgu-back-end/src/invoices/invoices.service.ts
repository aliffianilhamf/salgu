import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepo: Repository<InvoiceEntity>,
  ) { }
  create(createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceRepo.save(createInvoiceDto);
  }

  findAll() {
    return this.invoiceRepo.find();
  }

  findOne(id: number) {
    return this.invoiceRepo.findOne({ where: {id} });
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceRepo.update({id}, updateInvoiceDto);
  }

  remove(id: number) {
    return this.invoiceRepo.delete({ id} );
  }
}
