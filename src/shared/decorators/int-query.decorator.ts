import { BadRequestException, ParseIntPipe, Query } from '@nestjs/common';

export const IntQuery = (property: string) =>
  Query(
    property,
    new ParseIntPipe({
      exceptionFactory: () =>
        new BadRequestException(`${property} should be an integer.`),
    }),
  );
