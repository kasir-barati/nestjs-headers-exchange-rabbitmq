import {
  AmqpConnection,
  RabbitPayload,
  RabbitRPC,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable, UsePipes } from '@nestjs/common';
import {
  DRIVER_VERIFICATION_REQ_HEADER,
  DRIVER_VERIFICATION_REQ_QUEUE,
  DRIVER_VERIFICATION_REQ_RES_HEADER,
  DRIVER_VERIFICATION_REQ_RES_QUEUE,
  HEADERS_EXCHANGE,
  rabbitmqValidationPipe,
} from '../app.constant';
import {
  DriverVerificationRequestPayload,
  DriverVerificationRequestResponsePayload,
} from '../app.type';
import { Types } from 'mongoose';

@Injectable()
export class DriverVerificationService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @UsePipes(rabbitmqValidationPipe)
  @RabbitRPC({
    exchange: HEADERS_EXCHANGE,
    queue: DRIVER_VERIFICATION_REQ_QUEUE,
    routingKey: '',
    queueOptions: {
      arguments: {
        'x-match': 'any',
        [DRIVER_VERIFICATION_REQ_HEADER]: DRIVER_VERIFICATION_REQ_QUEUE,
      },
      bindQueueArguments: {
        'x-match': 'any',
        [DRIVER_VERIFICATION_REQ_HEADER]: DRIVER_VERIFICATION_REQ_QUEUE,
      },
    },
  })
  async driverVerificationRequest(
    @RabbitPayload() payload: DriverVerificationRequestPayload,
  ): Promise<void> {
    console.log();
    console.log();
    console.log('driver verification request queue (first queue), payload:');
    console.log(payload);
    console.log();
    console.log();

    await this.amqpConnection.publish<
      InstanceType<typeof DriverVerificationRequestResponsePayload>
    >(
      HEADERS_EXCHANGE,
      '',
      {
        verificationId: new Types.ObjectId().toString(),
        driverId: payload.driverId,
      },
      {
        headers: {
          [DRIVER_VERIFICATION_REQ_RES_HEADER]:
            DRIVER_VERIFICATION_REQ_RES_QUEUE,
        },
      },
    );
  }
}
