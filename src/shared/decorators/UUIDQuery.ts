import { BadRequestException, ParseUUIDPipe, Query } from '@nestjs/common';

export const UUIDQuery = (
  property: string,
  { optional = false }: { optional?: boolean },
) =>
  Query(
    property,
    new ParseUUIDPipe({
      optional,
      exceptionFactory: () =>
        new BadRequestException(`${property} should be a UUID.`),
    }),
  );
