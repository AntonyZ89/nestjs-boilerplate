import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRateTable1633836157304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'rate',
        columns: [
          {
            name: 'rate',
            type: 'tinyint',
            isNullable: false,
          },
          {
            name: 'observation',
            type: 'text',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('rate');
  }
}
