import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateConfigurationversionDto {
  @IsUUID()
  configuration_id!: string;

  @IsNumber()
  version_number!: number;

  metadata!: Record<string, unknown>;
}

export class UpdateConfigurationversionDto {
  @IsOptional()
  @IsUUID()
  configuration_id?: string | undefined;

  @IsOptional()
  @IsNumber()
  version_number?: number | undefined;

  @IsOptional()
  metadata?: Record<string, unknown> | undefined;
}

export class ConfigurationversionResponseDto {
  id!: string;
  configuration_id!: string;
  version_number!: number;
  metadata!: Record<string, unknown>;
  createdAt!: Date;
  updatedAt!: Date;
}
