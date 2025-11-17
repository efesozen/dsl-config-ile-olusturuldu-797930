import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateConfigurationDto, ConfigurationResponseDto, UpdateConfigurationDto } from '@saas-template/core';
import type { Configuration } from '@saas-template/database';
import { ConfigurationsRepository } from './configurations.repository';

@Injectable()
export class ConfigurationsService {
  constructor(
    private readonly configurationsRepository: ConfigurationsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ConfigurationResponseDto[]> {
    const configurations = await this.configurationsRepository.findAll(userId);
    return configurations.map((configuration: Configuration) => this.toResponseDto(configuration));
  }

  async findOne(id: string, userId: string): Promise<ConfigurationResponseDto> {
    const configuration = await this.configurationsRepository.findById(id, userId);
    if (!configuration) {
      throw new NotFoundException('Configuration not found');
    }
    return this.toResponseDto(configuration);
  }

  async create(userId: string, dto: CreateConfigurationDto): Promise<ConfigurationResponseDto> {
    return this.uow.execute(async () => {
      const configuration = await this.configurationsRepository.create(userId, dto);
      return this.toResponseDto(configuration);
    });
  }

  async update(id: string, userId: string, dto: UpdateConfigurationDto): Promise<ConfigurationResponseDto> {
    return this.uow.execute(async () => {
      const configuration = await this.configurationsRepository.update(id, userId, dto);
      if (!configuration) {
        throw new NotFoundException('Configuration not found');
      }
      return this.toResponseDto(configuration);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.configurationsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Configuration not found');
      }
    });
  }

  private toResponseDto(configuration: Configuration): ConfigurationResponseDto {
    return {
      id: configuration.id,
      user_id: configuration.user_id,
      name: configuration.name,
      metadata: configuration.metadata,
      version: configuration.version,
      createdAt: configuration.createdAt,
      updatedAt: configuration.updatedAt,
    };
  }
}
