import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PostgresService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.POSTGRES_HOST || 'postgres',
      port: Number(process.env.POSTGRES_PORT) || Number(5432),
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'postgres',
    });
  }

  async query(query: string, params: any[] = []) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);

      return result.rows;
    } finally {
      client.release();
    }
  }
}
