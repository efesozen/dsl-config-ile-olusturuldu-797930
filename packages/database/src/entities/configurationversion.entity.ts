import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Configuration } from './configuration.entity';

@Entity({ name: 'configuration_versions' })
export class Configurationversion extends BaseEntity {
  @Column({ type: 'integer' })
  @Index('idx_configuration_versions_version_number')
  version_number!: number;

  @Column({ type: 'jsonb' })
  metadata!: Record<string, unknown>;


@Column({ name: 'configuration_id' })
  configuration_id!: string;

  @Index('idx_configuration_versions_configuration_id')
  @ManyToOne('Configuration', 'configurationversions')
  @JoinColumn({ name: 'configuration_id' })
  configuration!: Configuration;
}
