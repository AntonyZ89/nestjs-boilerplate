import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateRateTable1633836157304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rate',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'productId',
            type: 'int',
          },
          {
            name: 'rate',
            type: 'smallint',
          },
          {
            name: 'observation',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'rate',
      new TableForeignKey({
        name: 'fk-rate-productId',
        columnNames: ['productId'],
        referencedTableName: 'product',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rate', 'fk-rate-productId');
    await queryRunner.dropTable('rate');
  }
}
