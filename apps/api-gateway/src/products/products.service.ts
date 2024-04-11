import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { createProductDto, updateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsService: ClientKafka,
  ) {}

  getAllProducts(limit: number) {
    return this.productsService.send('get-all-products', limit);
  }

  getProductById(id: number) {
    return this.productsService.send('get-product-by-id', id);
  }

  createProduct(createProduct: createProductDto) {
    return this.productsService.send('create-product', createProduct);
  }

  updateProduct(updateProduct: updateProductDto, id: number) {
    return this.productsService.send('update-product', { updateProduct, id });
  }

  deleteProduct(id: number) {
    return this.productsService.send('delete-product', id);
  }
}
