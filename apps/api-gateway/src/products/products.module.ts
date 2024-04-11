import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'products',
            brokers: ['kafka:9092']
          },
          consumer: {
            groupId: 'products-consumer'
          }
        }
      }
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
