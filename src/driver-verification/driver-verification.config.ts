import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import appConfig from '../configs/app.config';
import {
  HEADERS_EXCHANGE,
  DRIVER_VERIFICATION_REQ_QUEUE,
  DRIVER_VERIFICATION_REQ_HEADER,
} from '../app.constant';

export class DriverVerificationModuleConfig
  implements ModuleConfigFactory<RabbitMQConfig>
{
  constructor(
    @Inject(appConfig.KEY)
    private readonly verificationApiConfigs: ConfigType<typeof appConfig>,
  ) {}

  createModuleConfig(): RabbitMQConfig | Promise<RabbitMQConfig> {
    const { RABBITMQ_URL } = this.verificationApiConfigs;

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
          name: DRIVER_VERIFICATION_REQ_QUEUE,
          exchange: HEADERS_EXCHANGE,
          createQueueIfNotExists: true,
          bindQueueArguments: {
            'x-match': 'any',
            [DRIVER_VERIFICATION_REQ_HEADER]: DRIVER_VERIFICATION_REQ_QUEUE,
          },
          options: {
            arguments: {
              'x-match': 'any',
              [DRIVER_VERIFICATION_REQ_HEADER]: DRIVER_VERIFICATION_REQ_QUEUE,
            },
          },
        },
      ],
      connectionInitOptions: { wait: false },
    };
  }
}
