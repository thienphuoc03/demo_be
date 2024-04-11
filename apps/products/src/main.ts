import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'products',
          brokers: ['kafka:9092'],
        },
        consumer: {
          groupId: 'products-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('=====================================================');
  console.log('Products Microservice is running...');
  console.log('=====================================================');
}
bootstrap();
