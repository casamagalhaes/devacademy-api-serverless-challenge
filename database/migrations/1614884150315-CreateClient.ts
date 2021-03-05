import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateClient1614884150315 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'clients',
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
                  name: 'phone',
                  type: 'varchar',
               }
            ]
         })
      )
   }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable('clients');
    }

}
