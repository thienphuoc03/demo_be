import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { createProductDto, updateProductDto } from './dto';
import { Public } from '../auth/decorators/public.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role, Roles } from '../auth/decorators/roles.decorator';
import { LIMIT_NUNBER_DEFAULT } from 'apps/libs/constants';

@Controller('products')
export class ProductsController implements OnModuleInit {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly clientKafka: ClientKafka,
    private readonly productsService: ProductsService,
  ) {}

  onModuleInit() {
    this.clientKafka.subscribeToResponseOf('get-all-products');
    this.clientKafka.subscribeToResponseOf('get-product-by-id');
    this.clientKafka.subscribeToResponseOf('create-product');
    this.clientKafka.subscribeToResponseOf('update-product');
    this.clientKafka.subscribeToResponseOf('delete-product');

    this.clientKafka.connect();
  }

  @Public()
  @Get()
  getAllProduct(@Query('limit') limit: number = LIMIT_NUNBER_DEFAULT) {
    return this.productsService.getAllProducts(limit);
  }

  @Public()
  @Get(':id')
  getProductById(@Param() id: number) {
    return this.productsService.getProductById(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('create')
  createProduct(@Body() createProduct: createProductDto) {
    return this.productsService.createProduct(createProduct);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('update/:id')
  updateProduct(@Body() updateProduct: updateProductDto, @Param() id: number) {
    return this.productsService.updateProduct(updateProduct, +id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('delete/:id')
  deleteProduct(@Param() id: number) {
    return this.productsService.deleteProduct(+id);
  }
}
