import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Configuration } from '@saas-template/database';
import type { CreateConfigurationDto, UpdateConfigurationDto } from '@saas-template/core';

@Injectable()
export class ConfigurationsRepository extends Repository<Configuration> {
  constructor(private dataSource: DataSource) {
    super(Configuration, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Configuration[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Configuration | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateConfigurationDto): Promise<Configuration> {
    const configuration = this.create({
      ...dto,
      userId,
    });
    return this.save(configuration);
  }

  async update(id: string, userId: string, dto: UpdateConfigurationDto): Promise<Configuration | null> {
    const configuration = await this.findById(id, userId);
    if (!configuration) {
      return null;
    }

    Object.assign(configuration, dto);
    return this.save(configuration);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const configuration = await this.findById(id, userId);
    if (!configuration) {
      return false;
    }

    await this.softRemove(configuration);
    return true;
  }
}
