export interface ServiceResponse<T> {
    isError: boolean;
    message: string;
    statusCode: number;
    data?: T;
}