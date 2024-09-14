import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import appConfig from '../configs/app.config';
import {
  DRIVER_VERIFICATION_REQ_RES_QUEUE,
  HEADERS_EXCHANGE,
} from '../app.constant';

export class DriverVerificationReqResModuleConfig
  implements ModuleConfigFactory<RabbitMQConfig>
{
  constructor(
    @Inject(appConfig.KEY)
    private readonly driverApiConfigs: ConfigType<typeof appConfig>,
  ) {}

  createModuleConfig(): RabbitMQConfig | Promise<RabbitMQConfig> {
    const { RABBITMQ_URL } = this.driverApiConfigs;

    return {
      uri: RABBITMQ_URL,
      exchanges: [
        {
          name: HEADERS_EXCHANGE,
          type: 'headers',
        },
      ],
      queues: [
        {
          name: DRIVER_VERIFICATION_REQ_RES_QUEUE,
          createQueueIfNotExists: true,
        },
      ],
      connectionInitOptions: { wait: false },
    };
  }
}
