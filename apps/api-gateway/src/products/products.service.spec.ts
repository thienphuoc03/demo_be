import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ClientKafka } from '@nestjs/microservices';
import { of } from 'rxjs';
import { createProductDto, updateProductDto } from './dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let clientKafkaMock: jest.Mocked<ClientKafka>;

  beforeEach(async () => {
    clientKafkaMock = {
      send: jest.fn(),
      emit: jest.fn(),
    } as unknown as jest.Mocked<ClientKafka>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: 'PRODUCTS_SERVICE',
          useValue: clientKafkaMock,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call ClientKafka.send for getAllProducts', () => {
    const limit = 10;
    const expectedResponse = of([
      {
        id: 1,
        name: 'product 1',
        price: 10000,
        quantity: 10,
        image_url: 'image-url',
        created_at: '',
        updated_at: '',
      },
      {
        id: 2,
        name: 'product 2',
        price: 20000,
        quantity: 2,
        image_url: 'image-url',
        created_at: '',
        updated_at: '',
      },
    ]);
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.getAllProducts(limit);

    expect(clientKafkaMock.send).toHaveBeenCalledWith(
      'get-all-products',
      limit,
    );
    expect(result).toEqual(expectedResponse);
  });

  it('should call ClientKafka.send for getProductById', () => {
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
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.getProductById(id);

    expect(clientKafkaMock.send).toHaveBeenCalledWith('get-product-by-id', id);
    expect(result).toEqual(expectedResponse);
  });

  it('should call ClientKafka.send for createProduct', () => {
    const payload: createProductDto = {
      name: 'product 1',
      price: 10000,
      quantity: 10,
    };
    const expectedResponse = of(/* response data */);
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.createProduct(payload);

    expect(clientKafkaMock.send).toHaveBeenCalledWith(
      'create-product',
      payload,
    );
    expect(result).toEqual(expectedResponse);
  });

  it('should call ClientKafka.send for updateProduct', () => {
    const payload: updateProductDto = {
      name: 'product 1',
      price: 10000,
      quantity: 10,
    };
    const id = 1;
    const expectedResponse = of(/* response data */);
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.updateProduct(payload, id);

    expect(clientKafkaMock.send).toHaveBeenCalledWith('update-product', {
      updateProduct: payload,
      id,
    });
    expect(result).toEqual(expectedResponse);
  });

  it('should call ClientKafka.send for deleteProduct', () => {
    const id = 1;
    const expectedResponse = of('Deleted');
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.deleteProduct(id);

    expect(clientKafkaMock.send).toHaveBeenCalledWith('delete-product', id);
    expect(result).toEqual(expectedResponse);
  });
});
