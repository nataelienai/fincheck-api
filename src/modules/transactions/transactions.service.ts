import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { BankAccountOwnershipValidationService } from '../bank-accounts/services/bank-account-ownership-validation.service';
import { CategoryOwnershipValidationService } from '../categories/services/category-ownership-validation.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from './entities/transaction.entity';

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

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      categoryId?: string;
      type?: TransactionType;
    },
  ) {
    return this.transactionsRepository.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        categoryId: filters.categoryId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, name, value, type, date } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return this.transactionsRepository.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        name,
        value,
        type,
        date,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateTransactionOwnership(userId, transactionId);

    await this.transactionsRepository.delete({ where: { id: transactionId } });
  }

  private async validateEntitiesOwnership({
    userId,
    categoryId,
    bankAccountId,
    transactionId,
  }: {
    userId: string;
    categoryId: string;
    bankAccountId: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId && this.validateTransactionOwnership(userId, transactionId),
      this.bankAccountOwnershipValidationService.validate(
        userId,
        bankAccountId,
      ),
      this.categoryOwnershipValidationService.validate(userId, categoryId),
    ]);
  }

  private async validateTransactionOwnership(
    userId: string,
    transactionId: string,
  ) {
    const transaction = await this.transactionsRepository.findFirst({
      where: { id: transactionId, userId },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found.');
    }
  }
}
