import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

/* Va a utilizar las mismas validaciones pero las pondra opcionales */
export class UpdateProductDto extends PartialType(CreateProductDto) {
  /* @IsString()
  readonly name?: string;
  @IsString()
  readonly description?: string;
  @IsNumber()
  @IsPositive()
  readonly price?: number;
  @IsNumber()
  @IsPositive()
  readonly stock?: number;
  @IsUrl()
  readonly image?: string; */
}
