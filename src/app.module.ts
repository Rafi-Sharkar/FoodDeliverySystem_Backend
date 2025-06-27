import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { StoreModule } from './store/store.module';


@Module({
  imports: [StoreModule],
  providers: [ PrismaService, AppModule],
})
export class AppModule {}
