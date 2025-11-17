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
import type { CreateConfigurationversionDto, ConfigurationversionResponseDto, UpdateConfigurationversionDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConfigurationversionsService } from './configurationversions.service';

@Controller('configurationversions')
@UseGuards(JwtAuthGuard)
export class ConfigurationversionsController {
  constructor(private readonly configurationversionsService: ConfigurationversionsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<ConfigurationversionResponseDto[]> {
    return this.configurationversionsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<ConfigurationversionResponseDto> {
    return this.configurationversionsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateConfigurationversionDto,
    @CurrentUser() user: User
  ): Promise<ConfigurationversionResponseDto> {
    return this.configurationversionsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateConfigurationversionDto,
    @CurrentUser() user: User
  ): Promise<ConfigurationversionResponseDto> {
    return this.configurationversionsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.configurationversionsService.remove(id, user.id);
  }
}
