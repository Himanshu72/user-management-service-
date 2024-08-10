import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToRpc();
    const context = ctx.getContext(); // In TCP, you generally work with the context, not a specific response object

    let status = 500; // Default to Internal Server Error
    let message = 'Internal server error';
    let exceptionName = 'UnknownException';
    if(exception){
    exceptionName = exception.constructor.name;
     message = exception?.message || message;
    }
    // Log the error if needed (optional)
    console.error('Exception caught by global filter:', exception);

    throw new RpcException({
      statusCode: status,
      error: message,
      exception: exceptionName,
    });
}
}
