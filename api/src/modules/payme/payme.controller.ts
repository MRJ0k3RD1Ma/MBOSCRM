import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymeService } from './payme.service';
import { CreatePaymeDto } from './dto/create-payme.dto';
import { UpdatePaymeDto } from './dto/update-payme.dto';
import { PaymeAuthGuard } from './middleware/payme.middleware';
import { PaymeMethod } from './enum/transaction.enum';

@Controller('payme')
export class PaymeController {
  constructor(private readonly paymeService: PaymeService) { }

  @Post('/pay')
  @UseGuards(PaymeAuthGuard)
  async payme(@Body() body: any) {
    const { method, params, id } = body;

    switch (method) {
      case PaymeMethod.CheckPerformTransaction: {
        await this.paymeService.checkPerformTransaction(params, id);
        return { result: { allow: true } };
      }
      // case PaymeMethod.CheckTransaction: {
      //   const result = await this.paymeService.checkTransaction(params, id);
      //   return { result, id };
      // }
      // case PaymeMethod.CreateTransaction: {
      //   const result = await this.paymeService.createTransaction(params, id);
      //   return { result, id };
      // }
      // case PaymeMethod.PerformTransaction: {
      //   const result = await this.paymeService.performTransaction(params, id);
      //   return { result, id };
      // }
      // case PaymeMethod.CancelTransaction: {
      //   const result = await this.paymeService.cancelTransaction(params, id);
      //   return { result, id };
      // }
      // case PaymeMethod.GetStatement: {
      //   const result = await this.paymeService.getStatement(params, id);
      //   return { result: { transactions: result } };
      // }
      default:
        throw new Error('Unknown method');
    }
  }
}

