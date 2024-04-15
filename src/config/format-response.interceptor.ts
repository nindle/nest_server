import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { map } from 'rxjs/operators';

export interface FormatResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

@Injectable()
export class FormatResponseInterceptor<T>
  implements NestInterceptor<T, FormatResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<FormatResponse<T>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        code: response.statusCode,
        message: 'success',
        icon: '测试213',
        data,
      })),
    );
  }
}
