import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { BankAccountOwnershipValidationService } from '../bank-accounts/services/bank-account-ownership-validation.service';
import { CategoryOwnershipValidationService } from '../categories/services/category-ownership-validation.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly bankAccountOwnershipValidationService: BankAccountOwnershipValidationService,
    private readonly categoryOwnershipValidationService: CategoryOwnershipValidationService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, name, value, date, type } =
      createTransactionDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return this.transactionsRepository.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type,
      },
    });
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

  private async validateEntitiesOwnership({
    userId,
    categoryId,
    bankAccountId,
  }: {
    userId: string;
    categoryId: string;
    bankAccountId: string;
  }) {
    await Promise.all([
      this.bankAccountOwnershipValidationService.validate(
        userId,
        bankAccountId,
      ),
      this.categoryOwnershipValidationService.validate(userId, categoryId),
    ]);
  }
}
