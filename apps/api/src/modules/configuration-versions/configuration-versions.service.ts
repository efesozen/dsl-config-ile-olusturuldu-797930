import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateConfigurationversionDto, ConfigurationversionResponseDto, UpdateConfigurationversionDto } from '@saas-template/core';
import type { Configurationversion } from '@saas-template/database';
import { ConfigurationversionsRepository } from './configurationversions.repository';

@Injectable()
export class ConfigurationversionsService {
  constructor(
    private readonly configurationversionsRepository: ConfigurationversionsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ConfigurationversionResponseDto[]> {
    const configurationversions = await this.configurationversionsRepository.findAll(userId);
    return configurationversions.map((configurationversion: Configurationversion) => this.toResponseDto(configurationversion));
  }

  async findOne(id: string, userId: string): Promise<ConfigurationversionResponseDto> {
    const configurationversion = await this.configurationversionsRepository.findById(id, userId);
    if (!configurationversion) {
      throw new NotFoundException('Configurationversion not found');
    }
    return this.toResponseDto(configurationversion);
  }

  async create(userId: string, dto: CreateConfigurationversionDto): Promise<ConfigurationversionResponseDto> {
    return this.uow.execute(async () => {
      const configurationversion = await this.configurationversionsRepository.create(userId, dto);
      return this.toResponseDto(configurationversion);
    });
  }

  async update(id: string, userId: string, dto: UpdateConfigurationversionDto): Promise<ConfigurationversionResponseDto> {
    return this.uow.execute(async () => {
      const configurationversion = await this.configurationversionsRepository.update(id, userId, dto);
      if (!configurationversion) {
        throw new NotFoundException('Configurationversion not found');
      }
      return this.toResponseDto(configurationversion);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.configurationversionsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Configurationversion not found');
      }
    });
  }

  private toResponseDto(configurationversion: Configurationversion): ConfigurationversionResponseDto {
    return {
      id: configurationversion.id,
      configuration_id: configurationversion.configuration_id,
      version_number: configurationversion.version_number,
      metadata: configurationversion.metadata,
      createdAt: configurationversion.createdAt,
      updatedAt: configurationversion.updatedAt,
    };
  }
}
