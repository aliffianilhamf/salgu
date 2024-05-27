import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { UsageSnapshotEntity } from 'src/usage-snapshots/entities/usage-snapshot.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService],
  imports: [
    TypeOrmModule.forFeature([InvoiceEntity, UsageSnapshotEntity, UserEntity]),
  ],
  exports: [InvoicesService, TypeOrmModule],
})
export class InvoicesModule {}
