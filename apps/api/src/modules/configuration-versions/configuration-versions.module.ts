import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configurationversion } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { ConfigurationversionsController } from './configurationversions.controller';
import { ConfigurationversionsService } from './configurationversions.service';
import { ConfigurationversionsRepository } from './configurationversions.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Configurationversion]),
    DatabaseModule,
  ],
  controllers: [ConfigurationversionsController],
  providers: [ConfigurationversionsService, ConfigurationversionsRepository],
  exports: [ConfigurationversionsService],
})
export class ConfigurationversionsModule {}
