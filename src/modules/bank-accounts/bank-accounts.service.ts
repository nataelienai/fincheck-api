import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, type, color } = createBankAccountDto;

    return this.bankAccountsRepository.create({
      data: {
        userId,
        name,
        initialBalance,
        type,
        color,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findMany({ where: { userId } });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const bankAccount = await this.bankAccountsRepository.findFirst({
      where: { id: bankAccountId, userId },
    });

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found.');
    }

    const { name, initialBalance, type, color } = updateBankAccountDto;

    return this.bankAccountsRepository.update({
      where: { id: bankAccountId },
      data: { name, initialBalance, type, color },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccountsRepository.findFirst({
      where: { id: bankAccountId, userId },
    });

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found.');
    }

    await this.bankAccountsRepository.delete({
      where: { id: bankAccountId },
    });
  }
}
