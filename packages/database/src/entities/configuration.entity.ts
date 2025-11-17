import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'configurations' })
export class Configuration extends BaseEntity {
  @Column()
  @Index('idx_configurations_name')
  name!: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>;

  @Column({ type: 'integer' })
  @Index('idx_configurations_version')
  version!: number;


@Column({ name: 'user_id' })
  user_id!: string;

  @Index('idx_configurations_user_id')
  @ManyToOne('User', 'configurations')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
