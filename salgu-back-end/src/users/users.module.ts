import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { InvoicesService } from 'src/invoices/invoices.service';
import { InvoicesModule } from 'src/invoices/invoices.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, InvoicesService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity, FileEntity]), InvoicesModule],
})
export class UsersModule {}
