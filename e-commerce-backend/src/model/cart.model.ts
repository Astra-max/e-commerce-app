export interface CartItem {
    productId: string;
    name: string;
    description: string;
    category: string;
    quantity: string;
    status: string;
    amount: number;
    userId: string;
    image: string;
}

export interface CartResponse<T> {
    isError: boolean;
    message: string;
    statusCode: number;
    data: T;
}