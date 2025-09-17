import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSaleFeedbackDto } from './create-sale-feedback.dto';
import { SaleFeedbackResult, SaleFeedbackState } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateSaleFeedbackDto extends PartialType(CreateSaleFeedbackDto) {
    @ApiPropertyOptional({ example: 'TODO' })
    @IsOptional()
    @IsEnum(SaleFeedbackState)
    state?: SaleFeedbackState;

    @ApiPropertyOptional({ example: 'NOT_COMPLETED' })
    @IsOptional()
    @IsEnum(SaleFeedbackResult)
    result?: SaleFeedbackResult;
}


export class AliasParamDto {
    @IsUUID()
    alias: string;
}

export class UpdateStateDto {
    @ApiProperty({ example: 'TODO' })
    @IsEnum(SaleFeedbackState)
    state: SaleFeedbackState;
}