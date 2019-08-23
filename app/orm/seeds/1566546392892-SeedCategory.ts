import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { CategorySeed } from './category.seed';

export class SeedCategory1566546392892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    getRepository('Category')
      .find()
      .then(result => {
        if (result.length === 0) {
          getRepository('Category').save(CategorySeed);
        }
      });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
