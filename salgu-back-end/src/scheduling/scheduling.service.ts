import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { InvoicesService } from 'src/invoices/invoices.service';

@Injectable({ scope: Scope.DEFAULT })
export class SchedulingService {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    /**
     * Job functions that can be scheduled.
     */
    const JOB_NAME_FUNCTION_PAIRS: [string, () => any][] = [
      [
        'updateAllNonfinalInvoices',
        () => this.invoicesService.updateAllNonfinalInvoices(),
      ],
      [
        'createMissingInvoices',
        () => this.invoicesService.createMissingInvoices(),
      ],
    ];

    for (const [jobName, callback] of JOB_NAME_FUNCTION_PAIRS) {
      const jobAlreadyRegistered = this.schedulerRegistry.doesExist(
        'cron',
        jobName,
      );

      if (
        !jobAlreadyRegistered &&
        this.configService.getOrThrow<boolean>(`crons.${jobName}.enabled`)
      ) {
        const cronTime = this.configService.getOrThrow<string>(
          `crons.${jobName}.cron_time`,
        );
        const jobFunction = this.wrapJobCallback(jobName, callback);

        Logger.log(
          `Registering cron job '${jobName}' with cron time '${cronTime}'`,
        );
        const job = new CronJob(cronTime, jobFunction);

        this.schedulerRegistry.addCronJob(jobName, job);
        job.start();
      }
    }
  }

  private wrapJobCallback(name: string, jobFunction: () => any) {
    return async () => {
      Logger.log(`Running job '${name}'`);
      let duration = -1;
      let error: Error | undefined;

      const now = performance.now();
      try {
        await jobFunction();
      } catch (err) {
        error = err;
      } finally {
        duration = (performance.now() - now) / 1000;
      }

      if (!error) {
        Logger.log(`Job '${name}' ran successfully in ${duration.toFixed(2)}s`);
      } else {
        Logger.error(`Job '${name}' failed after ${duration.toFixed(2)}s`);
        Logger.error(error!);
      }
    };
  }
}
