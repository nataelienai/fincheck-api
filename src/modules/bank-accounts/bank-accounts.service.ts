import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all bankAccounts`;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    console.log(updateBankAccountDto);
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
