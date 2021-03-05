import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('products')
class Product{
   @PrimaryGeneratedColumn('uuid')
   id: String;

   @Column()
   name: String;

   @Column('numeric')
   price: number;
}

export default Product;
