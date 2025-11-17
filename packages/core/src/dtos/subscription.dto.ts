import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum SubscriptionPlan {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium'
}

export class CreateSubscriptionDto {
  @IsUUID()
  user_id!: string;

  @IsEnum(SubscriptionPlan)
  plan!: SubscriptionPlan;

  @IsDate()
  start_date!: Date;

  @IsDate()
  end_date!: Date;

  @IsBoolean()
  is_active!: boolean;
}

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;

  @IsOptional()
  @IsEnum(SubscriptionPlan)
  plan?: SubscriptionPlan | undefined;

  @IsOptional()
  @IsDate()
  start_date?: Date | undefined;

  @IsOptional()
  @IsDate()
  end_date?: Date | undefined;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean | undefined;
}

export class SubscriptionResponseDto {
  id!: string;
  user_id!: string;
  plan!: SubscriptionPlan;
  start_date!: Date;
  end_date!: Date;
  is_active!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
