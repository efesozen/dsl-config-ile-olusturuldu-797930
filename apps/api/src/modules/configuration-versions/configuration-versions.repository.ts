import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Configurationversion } from '@saas-template/database';
import type { CreateConfigurationversionDto, UpdateConfigurationversionDto } from '@saas-template/core';

@Injectable()
export class ConfigurationversionsRepository extends Repository<Configurationversion> {
  constructor(private dataSource: DataSource) {
    super(Configurationversion, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Configurationversion[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Configurationversion | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateConfigurationversionDto): Promise<Configurationversion> {
    const configurationversion = this.create({
      ...dto,
      userId,
    });
    return this.save(configurationversion);
  }

  async update(id: string, userId: string, dto: UpdateConfigurationversionDto): Promise<Configurationversion | null> {
    const configurationversion = await this.findById(id, userId);
    if (!configurationversion) {
      return null;
    }

    Object.assign(configurationversion, dto);
    return this.save(configurationversion);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const configurationversion = await this.findById(id, userId);
    if (!configurationversion) {
      return false;
    }

    await this.softRemove(configurationversion);
    return true;
  }
}
