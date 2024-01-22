import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  ParseEnumPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { IntQuery } from 'src/shared/decorators/int-query.decorator';
import { UUIDParam } from 'src/shared/decorators/uuid-param.decorator';
import { UUIDQuery } from 'src/shared/decorators/uuid-query.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @IntQuery('month') month: number,
    @IntQuery('year') year: number,
    @UUIDQuery('bankAccountId', { optional: true }) bankAccountId?: string,
    @UUIDQuery('categoryId', { optional: true }) categoryId?: string,
    @Query(
      'type',
      new ParseEnumPipe(TransactionType, {
        optional: true,
        exceptionFactory: () =>
          new BadRequestException(
            `type should be one of the following values: ${Object.values(
              TransactionType,
            ).join(', ')}.`,
          ),
      }),
    )
    type?: TransactionType,
  ) {
    return this.transactionsService.findAllByUserId(userId, {
      year,
      month,
      bankAccountId,
      categoryId,
      type,
    });
  }

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @UUIDParam('transactionId') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(
      userId,
      transactionId,
      updateTransactionDto,
    );
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @UUIDParam('transactionId') transactionId: string,
  ) {
    return this.transactionsService.remove(userId, transactionId);
  }
}
