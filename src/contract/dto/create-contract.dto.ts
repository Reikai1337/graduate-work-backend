import { ApiProperty } from "@nestjs/swagger";

export class CreateContractDto {
  @ApiProperty({ example: "1л" })
  count: string;
  @ApiProperty({ example: "+380-095-123-331" })
  phone: string;

  @ApiProperty({ example: 42 })
  price: number;

  @ApiProperty({ example: "Молоко" })
  type: string;

  @ApiProperty({ example: 12 })
  userId: number;
}
