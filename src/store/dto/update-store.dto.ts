import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsArray, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CommissionType, StoreType } from 'generated/prisma';

// export class UpdateStoreDto extends PartialType(CreateStoreDto) {
// }

export class UpdateStoreDto {
    @ApiProperty({description: "Shop name", example: "Rafi's Grocery Shop"})
    @IsString()
    @IsOptional()
    store_name?: string;

    @ApiProperty({description: "Shop owner's email", example: "rafisharkar144@gmail.com"})
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({description: "Shop owner name", example: "Rafi Sharkar"})
    @IsString()
    @IsOptional()
    bussiness_owner_id?: string

    @ApiProperty({description: "list of shop's hub/warehouse", example: ["rampura", "badda", "malibug"]})
    @IsArray()
    @IsOptional()
    hubs_list?: string[];

    @ApiProperty({description: "Shop type", example: "Grocery"})
    @IsEnum(['resturant', 'shop', 'grocery'])
    @IsOptional()
    store_type?: StoreType;

    @ApiProperty({description: "Shop owner's phone number", example: "01905493909"})
    @IsString()
    @IsOptional()
    phone_no?: string;

    @ApiProperty({description: "FDS's commission type", example: "percentage"})
    @IsEnum(['percentage', 'flat'])
    @IsOptional()
    commission_type?: CommissionType;

    @ApiProperty({description: "FDS's commission amound", example: 7})
    @IsNumber()
    @IsOptional()
    commission_amount?: number;

    @ApiProperty({description: "If there have any active coupon", example: "EID2025"})
    @IsOptional()
    @IsString()
    active_coupon?: string;
}

