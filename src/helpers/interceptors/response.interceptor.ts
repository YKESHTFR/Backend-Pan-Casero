import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { IResponseInterceptor } from "./interfaces";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IResponseInterceptor<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponseInterceptor<T>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      map((data) => ({
        method: request.method,
        ...data
      })),
    );
  }
}