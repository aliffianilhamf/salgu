import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepo: Repository<PaymentEntity>,
  ) { }
  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepo.save(createPaymentDto);
  }

  findAll() {
    return this.paymentRepo.find();
  }

  findOne(id: number) {
    return this.paymentRepo.findOne({ where: { id } });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepo.update({ id }, updatePaymentDto);
  }

  remove(id: number) {
    return this.paymentRepo.delete({ id });
  }
}
