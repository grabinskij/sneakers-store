export type CartItem = {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    size: number;
    saleImg: string;
    count: number;
}

export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}