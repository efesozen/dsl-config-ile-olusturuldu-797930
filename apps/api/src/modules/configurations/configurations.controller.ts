import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateConfigurationDto, ConfigurationResponseDto, UpdateConfigurationDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConfigurationsService } from './configurations.service';

@Controller('configurations')
@UseGuards(JwtAuthGuard)
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<ConfigurationResponseDto[]> {
    return this.configurationsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<ConfigurationResponseDto> {
    return this.configurationsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateConfigurationDto,
    @CurrentUser() user: User
  ): Promise<ConfigurationResponseDto> {
    return this.configurationsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateConfigurationDto,
    @CurrentUser() user: User
  ): Promise<ConfigurationResponseDto> {
    return this.configurationsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.configurationsService.remove(id, user.id);
  }
}
