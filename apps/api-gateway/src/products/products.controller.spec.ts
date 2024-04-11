import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { of } from 'rxjs';
import { createProductDto, updateProductDto } from '../products/dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: jest.Mocked<ProductsService>;

  beforeEach(async () => {
    productsService = {
      getAllProducts: jest.fn(),
      getProductById: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductsService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: productsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getAllProducts with limit', () => {
    const limit = 10;
    const expectedResponse = of(/* response data */);
    productsService.getAllProducts.mockReturnValue(expectedResponse);

    const result = controller.getAllProduct(limit);

    expect(productsService.getAllProducts).toHaveBeenCalledWith(limit);
    expect(result).toEqual(expectedResponse);
  });

  it('should call getProductById with id', () => {
    const id = 1;
    const expectedResponse = of(/* response data */);
    productsService.getProductById.mockReturnValue(expectedResponse);

    const result = controller.getProductById(id);

    expect(productsService.getProductById).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResponse);
  });

  it('should call createProduct with payload', () => {
    const payload: createProductDto = {
      name: 'product 1',
      price: 10000,
      quantity: 10,
    };
    const expectedResponse = of({
      id: 1,
      name: 'product 1',
      price: 10000,
      quantity: 10,
      image_url: 'image-url',
      created_at: '',
      updated_at: '',
    });
    productsService.createProduct.mockReturnValue(expectedResponse);

    const result = controller.createProduct(payload);

    expect(productsService.createProduct).toHaveBeenCalledWith(payload);
    expect(result).toEqual(expectedResponse);
  });

  it('should call updateProduct with payload and id', () => {
    const payload: updateProductDto = {
      name: 'product 1',
      price: 10000,
      quantity: 10,
    };
    const id = 1;
    const expectedResponse = of({
      id: 1,
      name: 'product 1',
      price: 10000,
      quantity: 10,
      image_url: 'image-url',
      created_at: '',
      updated_at: '',
    });
    productsService.updateProduct.mockReturnValue(expectedResponse);

    const result = controller.updateProduct(payload, id);

    expect(productsService.updateProduct).toHaveBeenCalledWith(payload, id, 1);
    expect(result).toEqual(expectedResponse);
  });

  it('should call deleteProduct with id', () => {
    const id = 1;
    const expectedResponse = of(/* response data */);
    productsService.deleteProduct.mockReturnValue(expectedResponse);

    const result = controller.deleteProduct(id);

    expect(productsService.deleteProduct).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResponse);
  });
});
