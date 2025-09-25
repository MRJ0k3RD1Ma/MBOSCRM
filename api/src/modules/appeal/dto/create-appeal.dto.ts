import { IsString, IsNotEmpty, IsOptional, IsEnum, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppealState } from '@prisma/client';

export class CreateAppealDto {
  @ApiProperty({ example: 'Ali Valiyev', description: 'Appeal yuboruvchi shaxsning ismi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '+998901234567', description: 'Appeal yuboruvchi telefon raqami' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+998(9[0-9]|3[3]|7[1]|8[8]|6[1])[0-9]{7}$/, {
    message: 'Telefon raqam faqat +998 va to‘g‘ri kod bilan boshlanishi kerak',
  })
  phone: string;

  @ApiProperty({ example: 'Texnik muammo', description: 'Appeal mavzusi' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'Saytda ro‘yxatdan o‘ta olmayapman', description: 'Appeal tafsilotlari' })
  @IsString()
  @IsNotEmpty()
  detail: string;

  @ApiProperty({ enum: AppealState, example: AppealState.NEW, description: 'Appeal holati' })
  @IsOptional()
  @IsEnum(AppealState)
  state?: AppealState;
}