import { Global, Module } from "@nestjs/common";
import { PostgresService } from "./postgres.service";

@Global()
@Module({
    imports: [],
    exports: [PostgresService],
    providers: [PostgresService]
})
export class PostgresModule {

}