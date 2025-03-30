export type StatusCode = 200 | 201 | 204 | 400 | 404;

export interface IResponse<T> {
    statusCode: StatusCode,
    message: string,
    data?: T
}

export interface IResponseList<T> {
    statusCode: StatusCode,
    message: string,
    data: {
        length: number;
        list: T
    }
}