import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
class Client{
   @PrimaryGeneratedColumn('uuid')
   id:String;

   @Column()
   name: String;

   @Column()
   phone:String;
}

export default Client;
