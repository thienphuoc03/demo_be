import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  createProductDto,
  updateProductDto,
} from '../../api-gateway/src/products/dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('get-all-products')
  getAllProducts(@Payload() limit: number) {
    return this.productsService.getAllProducts(+limit);
  }

  @MessagePattern('get-product-by-id')
  getProductById(@Payload() payload: any) {
    return this.productsService.getProductById(+payload);
  }

  @MessagePattern('create-product')
  createProduct(@Payload() payload: createProductDto) {
    return this.productsService.createProduct(payload);
  }

  @MessagePattern('update-product')
  updateProduct(
    @Payload() payload: { updateProduct: updateProductDto; id: number },
  ) {
    const { updateProduct, id } = payload;
    const userId = 1;

    return this.productsService.updateProduct(updateProduct, +id, +userId);
  }

  @MessagePattern('delete-product')
  deleteProduct(@Payload() payload: any) {
    return this.productsService.deleteProduct(+payload);
  }
}
