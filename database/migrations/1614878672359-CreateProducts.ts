import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateProducts1614878672359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(
          new Table({
             name: 'products',
             columns:[
                {
                   name: 'id',
                   type: 'varchar',
                   isPrimary: true,
                   generationStrategy: 'uuid',
                   default: 'uuid_generate_v4()',
                },
                {
                   name: 'name',
                   type: 'varchar',
                },
                {
                   name: 'price',
                   type: 'numeric',
                }
             ]
          })
       )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable('products');
    }

}
