import {
  IsString,
  IsInt,
  IsNumber,
  Min,
  MinLength,
  IsPositive,
} from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @IsPositive()
  @IsInt()
  @Min(1)
  no: number;
}
