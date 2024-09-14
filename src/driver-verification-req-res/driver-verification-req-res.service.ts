import {
  AmqpConnection,
  RabbitPayload,
  RabbitRPC,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable, UsePipes } from '@nestjs/common';
import {
  DRIVER_VERIFICATION_REQ_RES_HEADER,
  DRIVER_VERIFICATION_REQ_RES_QUEUE,
  HEADERS_EXCHANGE,
  rabbitmqValidationPipe,
} from '../app.constant';
import { DriverVerificationRequestResponsePayload } from '../app.type';

@Injectable()
export class DriverVerificationReqResService {
  @UsePipes(rabbitmqValidationPipe)
  @RabbitRPC({
    exchange: HEADERS_EXCHANGE,
    queue: DRIVER_VERIFICATION_REQ_RES_QUEUE,
    queueOptions: {
      bindQueueArguments: {
        'x-match': 'any',
        [DRIVER_VERIFICATION_REQ_RES_HEADER]: DRIVER_VERIFICATION_REQ_RES_QUEUE,
      },
    },
  })
  async driverVerificationReqResponse(
    @RabbitPayload()
    payload: InstanceType<typeof DriverVerificationRequestResponsePayload>,
  ) {
    console.log(payload);
  }
}
