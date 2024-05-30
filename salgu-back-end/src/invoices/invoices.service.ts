import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UsageSnapshotEntity } from 'src/usage-snapshots/entities/usage-snapshot.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Duration, add, addSeconds } from 'date-fns';

@Injectable()
export class InvoicesService {
  /**
   * Billing factor (currency / (kilobyte * second))
   */
  readonly billingFactor: number;
  private billingPeriod: Duration;

  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepo: Repository<InvoiceEntity>,
    @InjectRepository(UsageSnapshotEntity)
    private readonly usageSnapshotRepo: Repository<UsageSnapshotEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {
    this.billingFactor = this.configService.getOrThrow<number>(
      'drive.billing_factor',
    );
    this.billingPeriod = this.configService.getOrThrow<Duration>(
      'drive.billing_period',
    );
  }

  create(createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceRepo.save(createInvoiceDto);
  }

  findAll(userId?: number) {
    return this.invoiceRepo.find({ where: { userId } });
  }

  findOne(id: number) {
    return this.invoiceRepo.findOne({ where: { id } });
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceRepo.update({ id }, updateInvoiceDto);
  }

  remove(id: number) {
    return this.invoiceRepo.delete({ id });
  }

  async updateInvoice(id: number) {
    const invoice = await this.invoiceRepo.findOneOrFail({ where: { id } });
    const invoicePatch = new InvoiceEntity();
    let to = new Date();

    if (invoice.endedAt.getTime() < Date.now()) {
      invoicePatch.isFinal = true;
      to = invoice.endedAt;
    }

    const amount = await this.calculateAmountOwed(
      invoice.startedAt,
      to,
      invoice.userId,
    );

    invoicePatch.amount = amount;

    await this.invoiceRepo.update({ id: invoice.id }, invoicePatch);
  }

  async updateAllNonfinalInvoices() {
    const invoices = await this.invoiceRepo.find({
      where: { isFinal: false },
      select: { id: true },
    });

    for (const invoice of invoices) {
      await this.updateInvoice(invoice.id);
    }
  }

  /**
   * Create missing invoices for all users.
   */
  async createMissingInvoices() {
    const now = new Date();
    const users = await this.userRepo.find({
      select: { id: true, createdAt: true },
    });

    for (const user of users) {
      const lastInvoice = await this.invoiceRepo.findOne({
        where: { userId: user.id },
        order: { endedAt: 'DESC' },
      });

      // If user doesn't have any invoices at all.
      if (!lastInvoice) {
        let endedAt = add(user.createdAt, this.billingPeriod);

        if (now.getTime() > endedAt.getTime()) {
          endedAt = now;
        }

        const invoiceEntity: Partial<InvoiceEntity> = {
          startedAt: user.createdAt,
          endedAt: endedAt,
          amount: await this.calculateAmountOwed(user.createdAt, now, user.id),
          paid: false,
          isFinal: false,
          userId: user.id,
          lastUpdatedAt: now,
        };

        await this.invoiceRepo.save(invoiceEntity);
        continue;
      }

      // If the last invoice hasn't ended yet.
      if (lastInvoice.endedAt.getTime() >= now.getTime()) {
        continue;
      }

      // If the last invoice has ended, and we need to create a new one.
      const newEndedAt = add(lastInvoice.endedAt, this.billingPeriod);
      const newInvoiceEntity: Partial<InvoiceEntity> = {
        startedAt: lastInvoice.endedAt,
        endedAt: newEndedAt,
        amount: await this.calculateAmountOwed(
          lastInvoice.endedAt,
          newEndedAt,
          user.id,
        ),
        paid: false,
        isFinal: false,
        userId: user.id,
        lastUpdatedAt: now,
      };

      await this.invoiceRepo.save(newInvoiceEntity);
    }
  }

  /**
   * Calculate the amount owed by a user for a given period.
   */
  private async calculateAmountOwed(fro: Date, to: Date, userId: number) {
    const snaps = await this.usageSnapshotRepo.find({
      where: {
        userId,
        capturedAt: LessThanOrEqual(to),
      },
    });

    let amount = 0;
    let cumSize = 0;

    for (let i = 0; i < snaps.length; i++) {
      const snap = snaps[i];
      const sizeDelta = snap.sizeDelta;

      // Time delta in seconds
      const timeDelta = Math.floor(
        (i !== snaps.length - 1
          ? snaps[i + 1].capturedAt.getTime() - snap.capturedAt.getTime()
          : to.getTime() - snap.capturedAt.getTime()) / 1000,
      );

      cumSize += sizeDelta;

      if (snap.capturedAt < fro) {
        // Overlap in seconds
        const overlap =
          (addSeconds(snap.capturedAt, timeDelta).getTime() - fro.getTime()) /
          1000;

        if (overlap > 0) amount += cumSize * overlap * this.billingFactor;
      } else {
        amount += cumSize * timeDelta * this.billingFactor;
      }
    }

    return amount;
  }
}
