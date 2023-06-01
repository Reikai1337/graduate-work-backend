import { ProductType } from "src/product-type/product-type.entity";
import { ProductTypeService } from "src/product-type/product-type.service";
import { User } from "src/users/user.entity";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ContractController } from "./contract.controller";
import { Contract } from "./contract.entity";
import { ContractService } from "./contract.service";

@Module({
  imports: [TypeOrmModule.forFeature([Contract, ProductType, User])],
  controllers: [ContractController],
  providers: [ContractService, ProductTypeService],
})
export class ContractModule {}
