export class CreateOrderDto {
  address: string;
  lastName: string;
  name: string;
  phone: string;
  totalPrice: number;
  orders: {
    count: number;
    price: number;
    productId: number;
  }[];
}
