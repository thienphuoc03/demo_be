import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {
  createProductDto,
  updateProductDto,
} from '../../api-gateway/src/products/dto';
import { of } from 'rxjs';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: jest.Mocked<ProductsService>;

  beforeEach(async () => {
    // Create a mock ProductsService
    productsService = {
      getAllProducts: jest.fn(),
      getProductById: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductsService>;

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: productsService }],
    }).compile();

    productsController = app.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  it('should call getAllProducts with provided limit', () => {
    const limit = 10;
    const expectedResponse = of(/* expected response data */);
    productsService.getAllProducts.mockReturnValue(expectedResponse);

    const result = productsController.getAllProducts(limit);

    expect(productsService.getAllProducts).toHaveBeenCalledWith(limit);
    expect(result).toEqual(expectedResponse);
  });

  it('should call getProductById with provided payload', () => {
    const payload = 1;
    const expectedResponse = of(/* expected response data */);
    productsService.getProductById.mockReturnValue(expectedResponse);

    const result = productsController.getProductById(payload);

    expect(productsService.getProductById).toHaveBeenCalledWith(payload);
    expect(result).toEqual(expectedResponse);
  });

  it('should call createProduct with provided payload', () => {
    const payload: createProductDto = {
      name: 'product 1',
      price: 10000,
      quantity: 10,
    };
    const expectedResponse = of(/* expected response data */);
    productsService.createProduct.mockReturnValue(expectedResponse);

    const result = productsController.createProduct(payload);

    expect(productsService.createProduct).toHaveBeenCalledWith(payload);
    expect(result).toEqual(expectedResponse);
  });

  it('should call updateProduct with provided payload', () => {
    const payload = {
      updateProduct: {
        name: 'product 1',
        price: 10000,
        quantity: 10,
      },
      id: 1,
    };
    const expectedResponse = of(/* expected response data */);
    productsService.updateProduct.mockReturnValue(expectedResponse);

    const result = productsController.updateProduct(payload);

    expect(productsService.updateProduct).toHaveBeenCalledWith(
      payload.updateProduct,
      payload.id,
      1,
    );
    expect(result).toEqual(expectedResponse);
  });

  it('should call deleteProduct with provided payload', () => {
    const payload = 1;
    const expectedResponse = of(/* expected response data */);
    productsService.deleteProduct.mockReturnValue(expectedResponse);

    const result = productsController.deleteProduct(payload);

    expect(productsService.deleteProduct).toHaveBeenCalledWith(payload);
    expect(result).toEqual(expectedResponse);
  });
});
