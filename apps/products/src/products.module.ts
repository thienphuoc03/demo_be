import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PostgresModule } from 'apps/libs/database/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
