import { Injectable } from '@nestjs/common';
import { UpdatePaymeDto } from './dto/update-payme.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Types } from 'mongoose';
import { PaymeData, PaymeError } from './enum/transaction.enum';
import TransactionError from './errors/transaction.erros';

@Injectable()
export class PaymeService {
  constructor(private readonly prisma: PrismaService) {}
  async checkPerformTransaction(params: any, id: string): Promise<void> {
    let { account, amount } = params;

    if (!Types.ObjectId.isValid(account.user_id)) {
      throw new TransactionError(PaymeError.UserNotFound, id, PaymeData.UserId);
    }

    if (!Types.ObjectId.isValid(account.product_id)) {
      throw new TransactionError(
        PaymeError.ProductNotFound,
        id,
        PaymeData.ProductId,
      );
    }

    amount = Math.floor(amount / 100);

    const user = await this.prisma.user.findUnique({
      where: { id: account.user_id },
    });
    if (!user) {
      throw new TransactionError(PaymeError.UserNotFound, id, PaymeData.UserId);
    }
  }

  findAll() {
    return `This action returns all payme`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payme`;
  }

  update(id: number, updatePaymeDto: UpdatePaymeDto) {
    return `This action updates a #${id} payme`;
  }

  remove(id: number) {
    return `This action removes a #${id} payme`;
  }
}
