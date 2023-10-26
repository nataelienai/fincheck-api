import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  create(createTransactionDto: CreateTransactionDto) {
    return createTransactionDto;
  }

  findAll() {
    return `This action returns all transactions`;
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return updateTransactionDto;
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
