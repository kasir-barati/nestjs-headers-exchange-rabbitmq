import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import {
  DRIVER_VERIFICATION_REQ_HEADER,
  DRIVER_VERIFICATION_REQ_QUEUE,
  HEADERS_EXCHANGE,
} from './app.constant';
import { DriverVerificationRequestPayload } from './app.type';
import { Types } from 'mongoose';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @ApiOperation({
    description: `Send a message to ${DRIVER_VERIFICATION_REQ_QUEUE}.`,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
    description: 'Internal server error.',
  })
  @Get()
  async sendMessageToDriverVerificationReqQueue() {
    console.log();
    console.log();
    console.log('controller');
    console.log();
    console.log();

    // Here I wanna send a message to a queue which bound to the specified header.
    // But instead I am getting:

    await this.amqpConnection.publish<DriverVerificationRequestPayload>(
      HEADERS_EXCHANGE,
      '',
      {
        driverId: new Types.ObjectId().toString(),
      },
      {
        headers: {
          [DRIVER_VERIFICATION_REQ_HEADER]: DRIVER_VERIFICATION_REQ_QUEUE,
        },
      },
    );
  }
}
