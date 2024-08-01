import { CartModelItem } from "./Cart.Model";

export interface OrderModel {
    items: CartModelItem[];
    name: string;
    address: string;
    cardId: string;
    creditCard: string;
}