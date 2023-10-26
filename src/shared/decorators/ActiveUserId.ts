import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.userId) {
      throw new UnauthorizedException(
        'Could not determine user ID from request.',
      );
    }

    return request.userId;
  },
);
