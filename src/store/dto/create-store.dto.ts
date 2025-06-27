import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEmail, IsEnum, IsBoolean, IsArray, IsDateString, IsOptional, IsNumber, IsDate, IsObject } from 'class-validator';
import { CommissionType, InventoryCategory, ResturantStatus, StoreType } from 'generated/prisma';

export class CreateStoreDto {
  @ApiProperty({description: "Shop owner name", example: "Rafi Sharkar"})
  @IsString()
  bussiness_owner_id: string

  @ApiProperty({description: "Shop name", example: "Rafi's Grocery Shop"})
  @IsString()
  store_name: string;

  @ApiProperty({description: "Shop owner's phone number", example: "01905493909"})
  @IsString()
  phone_no: string;

  @ApiProperty({description: "Contact secondery person name", example: "Hasan Al Banna"})
  @IsString()
  contact_person_name: string;

  @ApiProperty({description: "Shop owner's email", example: "rafisharkar144@gmail.com"})
  @IsEmail()
  email: string;

  @ApiProperty({description: "Shop's inventory category", example: "countable"})
  @IsEnum(['Inventory_countable', 'Inventory_not_countable'])
  inventory_category: InventoryCategory;

  @ApiProperty({description: "FDS's commission type", example: "percentage"})
  @IsEnum(['percentage', 'flat'])
  commission_type: CommissionType;

  @ApiProperty({description: "FDS's commission amound", example: 7})
  @IsNumber()
  commission_amount: number;

  @ApiProperty({description: "Shop type", example: "Grocery"})
  @IsEnum(['resturant', 'shop', 'grocery'])
  store_type: StoreType;

  @ApiProperty({description: "Minimum order amound", example: 3})
  @IsNumber()
  min_order_amount: number;

  @ApiProperty({description: "Shop category", example: ["Grocery", "Tea stall"]})
  @IsArray()
  store_category: string[];

  @ApiProperty({description: "Open for order", example: true})
  @IsBoolean()
  open_for_order: boolean;

  @ApiProperty({description: "If the store is a franchise then give francise_id", example: "CPuttara34"})
  @IsOptional()
  @IsString()
  franchise_id?: string;

  @ApiProperty({description: "list of shop's hub/warehouse", example: ["rampura", "badda", "malibug"]})
  @IsArray()
  hubs_list: string[];

  @ApiProperty({description: "If vat included", example: true})
  @IsBoolean()
  is_vat_included: boolean;

  @ApiProperty({description: "If there have any active coupon", example: "EID2025"})
  @IsOptional()
  @IsString()
  active_coupon?: string;

  @ApiProperty({description: "If there have any special settings/feature for store", example: "fast delivery"})
  @IsOptional()
  @IsString()
  store_settings?: string;

  @ApiProperty({description: "When order taken", example: "2025-06-26T04:13:46.200Z"})
  @IsDateString()
  operating_hour_start: string;

  @ApiProperty({description: "When order delivered", example: "2025-06-26T04:14:06.200Z"})
  @Type(() => Date)
  @IsDate()
  operating_hour_end: Date;

  @ApiProperty({description: "shop meta data", example: {note: "30min delivery", lastaudittime: "2025-06-26T04:14:06.200Z"}})
  @IsObject()
  @IsOptional()
  meta?: object;

  @ApiProperty({description: "shop key word for seo/rank shop", example: "gorcery,fastdelivery,24/7service"})
  @IsOptional()
  @IsString()
  key_words?: string;

  @ApiProperty({description: "shop availability status", example: "is_active"})
  @IsEnum(['is_active', 'inactive', 'suspended', 'deal_closed'])
  resturant_status: ResturantStatus;
}


export class CreateStoreResponseDto{
  @ApiProperty({description: "Store Id", example: "3c725fb4-5d04-46fc-92d1-dac1e600a74e"})
  @IsString()
  id: string

  @ApiProperty({description: "Shop name", example: "Rafi's Grocery Shop"})
  @IsString()
  store_name: string;

  @ApiProperty({description: "Shop owner's email", example: "rafisharkar144@gmail.com"})
  @IsEmail()
  email: string;
  
}