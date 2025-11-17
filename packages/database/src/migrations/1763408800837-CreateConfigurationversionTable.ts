import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateConfigurationversionTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'configuration_versions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'configuration_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'version_number',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'metadata',
            type: 'jsonb',
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
      'configuration_versions',
      new TableForeignKey({
        name: 'fk_configuration_versions_configuration_id',
        columnNames: ['configuration_id'],
        referencedTableName: 'configurations',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'configuration_versions',
      new TableIndex({
        name: 'idx_configuration_versions_configuration_id',
        columnNames: ['configuration_id'],
      })
    );

    await queryRunner.createIndex(
      'configuration_versions',
      new TableIndex({
        name: 'idx_configuration_versions_configuration_id',
        columnNames: ['configuration_id'],
      })
    );

    await queryRunner.createIndex(
      'configuration_versions',
      new TableIndex({
        name: 'idx_configuration_versions_version_number',
        columnNames: ['version_number'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('configuration_versions', 'idx_configuration_versions_configuration_id');
    await queryRunner.dropIndex('configuration_versions', 'idx_configuration_versions_version_number');
    await queryRunner.dropForeignKey('configuration_versions', 'fk_configuration_versions_configuration_id');
    await queryRunner.dropTable('configuration_versions');
  }
}
