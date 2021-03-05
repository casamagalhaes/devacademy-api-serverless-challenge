import { getRepository, createQueryBuilder, UpdateResult} from 'typeorm';
import Product from '../models/Product';

interface Request{
   name: string;
   price: number;
}

class ProductService{
   public async execute({name, price}: Request): Promise<Product>{
      const productsRepository = getRepository(Product);
      const product = productsRepository.create({
         name,
         price
      });
      await productsRepository.save(product);
      return product;
   }
}

export default ProductService;
