import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { ConfigurationsController } from './configurations.controller';
import { ConfigurationsService } from './configurations.service';
import { ConfigurationsRepository } from './configurations.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Configuration]),
    DatabaseModule,
  ],
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService, ConfigurationsRepository],
  exports: [ConfigurationsService],
})
export class ConfigurationsModule {}
