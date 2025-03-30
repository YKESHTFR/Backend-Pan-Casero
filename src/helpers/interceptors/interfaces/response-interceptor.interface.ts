export interface IResponseInterceptor<T> {
  method: string;
  data?: T;
}

