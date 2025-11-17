import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateConfigurationDto {
  @IsUUID()
  user_id!: string;

  @IsString()
  @MinLength(1)
  name!: string;

  @IsOptional()
  metadata?: Record<string, unknown>;

  @IsNumber()
  version!: number;
}

export class UpdateConfigurationDto {
  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string | undefined;

  @IsOptional()
  @IsOptional()
  metadata?: Record<string, unknown> | undefined;

  @IsOptional()
  @IsNumber()
  version?: number | undefined;
}

export class ConfigurationResponseDto {
  id!: string;
  user_id!: string;
  name!: string;
  metadata?: Record<string, unknown>;
  version!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
