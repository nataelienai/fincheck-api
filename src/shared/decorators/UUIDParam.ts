import { BadRequestException, Param, ParseUUIDPipe } from '@nestjs/common';

export const UUIDParam = (property: string) =>
  Param(
    property,
    new ParseUUIDPipe({
      exceptionFactory: () =>
        new BadRequestException('Path parameter should be a UUID'),
    }),
  );
