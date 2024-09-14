import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DriverVerificationModule } from './driver-verification/driver-verification.module';
import { DriverVerificationReqResModule } from './driver-verification-req-res/driver-verification-req-res.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configs/app.config';
import { join } from 'path';

@Module({
  imports: [
    DriverVerificationModule,
    DriverVerificationReqResModule,
    ConfigModule.forRoot({
      load: [appConfig],
      cache: true,
      isGlobal: true,
      envFilePath: [join(process.cwd(), '.env')],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
