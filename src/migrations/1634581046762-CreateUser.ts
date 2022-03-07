import { GenderEnum } from 'src/enums/gender.enum';
import { MaritalEnum } from 'src/enums/marital.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1634581046762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar' },
          { name: 'surname', type: 'varchar' },
          { name: 'birthday', type: 'date' },
          { name: 'gender', type: 'enum', enum: Object.keys(GenderEnum) },
          { name: 'marital_status', type: 'enum', enum: Object.keys(MaritalEnum), isNullable: true },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar', isUnique: true },

          { name: 'children', type: 'boolean', isNullable: true },
          { name: 'sexual_orientation', type: 'smallint', isNullable: true },
          { name: 'style', type: 'varchar', isNullable: true },
          { name: 'smoke', type: 'boolean', isNullable: true },
          { name: 'drunk', type: 'boolean', isNullable: true },
          { name: 'pets', type: 'boolean', isNullable: true },
          { name: 'hometown', type: 'varchar', isNullable: true },
          { name: 'webpage', type: 'varchar', isNullable: true },
          { name: 'about', type: 'varchar', isNullable: true },
          { name: 'passions', type: 'varchar', isNullable: true },
          { name: 'sports', type: 'varchar', isNullable: true },
          { name: 'activities', type: 'varchar', isNullable: true },
          { name: 'books', type: 'varchar', isNullable: true },
          { name: 'songs', type: 'varchar', isNullable: true },
          { name: 'tv_shows', type: 'varchar', isNullable: true },
          { name: 'gastronomic_preferences', type: 'varchar', isNullable: true },
          { name: 'home_phone', type: 'varchar', isNullable: true },
          { name: 'phone', type: 'varchar', isNullable: true },
          { name: 'address_1', type: 'varchar', isNullable: true },
          { name: 'address_2', type: 'varchar', isNullable: true },
          { name: 'city', type: 'varchar', isNullable: true },
          { name: 'state', type: 'varchar', isNullable: true },
          { name: 'zip_code', type: 'varchar', isNullable: true },
          { name: 'country', type: 'varchar', isNullable: true },
          { name: 'education', type: 'varchar', isNullable: true },
          { name: 'school', type: 'varchar', isNullable: true },
          { name: 'college', type: 'varchar', isNullable: true },
          { name: 'course', type: 'varchar', isNullable: true },
          { name: 'university_degree', type: 'varchar', isNullable: true },
          { name: 'company', type: 'varchar', isNullable: true },
          { name: 'year', type: 'varchar', isNullable: true },
          { name: 'profession', type: 'varchar', isNullable: true },
          { name: 'sector', type: 'varchar', isNullable: true },
          { name: 'title', type: 'varchar', isNullable: true },
          { name: 'strong_point', type: 'varchar', isNullable: true },
          { name: 'height', type: 'decimal', precision: 5, scale: 2, isNullable: true },
          { name: 'eye_color', type: 'varchar', isNullable: true },
          { name: 'hair_color', type: 'varchar', isNullable: true },
          { name: 'physical_type', type: 'varchar', isNullable: true },
          { name: 'body_art', type: 'varchar', isNullable: true },
          { name: 'appearance', type: 'varchar', isNullable: true },
          { name: 'like_me', type: 'varchar', isNullable: true },

          { name: 'acceptTermsAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
