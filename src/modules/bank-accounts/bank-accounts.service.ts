import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  create(createBankAccountDto: CreateBankAccountDto) {
    console.log(createBankAccountDto);
    return 'This action adds a new bankAccount';
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
