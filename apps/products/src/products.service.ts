import { Injectable } from '@nestjs/common';
import { createProductDto } from '../../api-gateway/src/products/dto';
import { PostgresService } from '../../libs/database/postgres.service';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private readonly postgresService: PostgresService) {}

  getAllProducts(limit: number): Observable<any> {
    return from(this.postgresService.query('SELECT * FROM products LIMIT $1', [limit])).pipe(
      map((products: any) => {
        return products;
      }),
    );
  }

  getProductById(id: number): Observable<any> {
    return from(
      this.postgresService.query('SELECT * FROM products WHERE id = $1', [id]),
    ).pipe(
      map((product: any) => {
        return product;
      }),
    );
  }

  createProduct(createProduct: createProductDto): Observable<any> {
    const { name, price , quantity } = createProduct;

    return from(
      this.postgresService.query(
        'INSERT INTO products(name, amount, quantity) VALUES ($1, $2, $3) RETURNING *',
        [name, price, quantity],
      ),
    ).pipe(
      map((product: any) => {
        return product;
      }),
    );
  }

  updateProduct(
    updateProduct: any,
    id: number,
    userId: number,
  ): Observable<any> {
    const { name, amount, quantity } = updateProduct;

    const timestamp = new Date();

    return from(
      this.postgresService.query(
        'UPDATE products name = $1, amount = $2, quantity = $3, updated_at = $4, user_id = $5) WHERE id = $6 RETURNING *',
        [name, amount, quantity, timestamp, userId, id],
      ),
    ).pipe(
      map((product: any) => {
        return product;
      }),
    );
  }

  deleteProduct(id: number): Observable<any> {
    return from(
      this.postgresService.query('DELETE FROM products WHERE id = $1', [id]),
    ).pipe(map(() => 'Deleted'));
  }
}
