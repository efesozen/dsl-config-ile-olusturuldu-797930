import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateConfigurationTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'configurations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'version',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'configurations',
      new TableForeignKey({
        name: 'fk_configurations_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'configurations',
      new TableIndex({
        name: 'idx_configurations_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'configurations',
      new TableIndex({
        name: 'idx_configurations_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'configurations',
      new TableIndex({
        name: 'idx_configurations_name',
        columnNames: ['name'],
      })
    );

    await queryRunner.createIndex(
      'configurations',
      new TableIndex({
        name: 'idx_configurations_version',
        columnNames: ['version'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('configurations', 'idx_configurations_user_id');
    await queryRunner.dropIndex('configurations', 'idx_configurations_name');
    await queryRunner.dropIndex('configurations', 'idx_configurations_version');
    await queryRunner.dropForeignKey('configurations', 'fk_configurations_user_id');
    await queryRunner.dropTable('configurations');
  }
}
