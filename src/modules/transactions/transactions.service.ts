import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return createTransactionDto;
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepository.findMany({ where: { userId } });
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return updateTransactionDto;
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
