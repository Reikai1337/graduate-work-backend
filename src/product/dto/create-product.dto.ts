export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  sale: number;
  weight: number;
  type: string;
  weightType: string;
  imageId: number | null;
  package: string;
  barcode: string;
  boxSize: string;
  storageConditions: string;
  quantityPerBox: number;
  availableQuantity: number;
}
