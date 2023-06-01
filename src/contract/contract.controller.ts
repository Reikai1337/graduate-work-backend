import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";

import { ContractService } from "./contract.service";
import { CreateContractDto } from "./dto/create-contract.dto";

@Controller("contract")
export class ContractController {
  constructor(private contractService: ContractService) {}

  @Post()
  create(@Body() dto: CreateContractDto) {
    return this.contractService.create(dto);
  }

  @Get("/:userId")
  getUserContracts(@Param("userId") userId: string) {
    return this.contractService.getUserContracts(Number(userId));
  }

  @Get()
  getAll() {
    return this.contractService.getAllContracts();
  }

  @Patch("/accept")
  accept(@Body() dto: { id: number; value: boolean }) {
    return this.contractService.accept(dto);
  }

  @Patch("/reject")
  reject(@Body() dto: { id: number; value: boolean }) {
    return this.contractService.reject(dto);
  }
}
