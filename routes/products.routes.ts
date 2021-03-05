import ProductService from '../services/ProductService';
import {Router} from 'express';
import { getRepository, createQueryBuilder, Like, Equal } from 'typeorm';
import Product from '../models/Product';


const productsRouter = Router();

productsRouter.get('/', async (request, response)=>{
   const productsRepository = getRepository(Product);
   const products = await productsRepository.find();

   return response.json(products);
});

productsRouter.get('/:id', async(request, response)=>{
   const {id} = request.params;
   const productsRepository = getRepository(Product);
   const product = await productsRepository.findOne({id})

   return response.json(product);
})

productsRouter.get('/:filter', async(request, response)=>{
   const {filter} = request.params;
   const productsRepository = getRepository(Product);
   const product = await productsRepository.find({
         name: Like({filter})
   });
   console.log(product);
   return response.json(product);
})

productsRouter.post('/', async (request, response)=>{
      const {name, price} = request.body;
      const createProduct = new ProductService();

      const product = await createProduct.execute({
         name,
         price
      });
      return response.json(product);
});

productsRouter.put('/:id', async (request, response) =>{
   const productsRepository = getRepository(Product);
   const{id} = request.params;
   const {name, price} = request.body;
   const productIndex = productsRepository.findOne(id);
   if(!productIndex){
      return response.status(400).json({
         error: 'Produto não encontrado!'
      });
   }else{
      const product = await productsRepository.update(id,{
         name,
         price
      });
      return response.json({
         message: "Produto Alterado!"
      });
   }
});

productsRouter.delete('/:id', async (request, response) =>{
   const productsRepository = getRepository(Product);
   const{id} = request.params;
   const {name, price} = request.body;
   const productIndex = productsRepository.findOne(id);
   if(!productIndex){
      return response.status(400).json({
         error: 'Produto não encontrado!'
      });
   }else{
      const product = await productsRepository.delete(id);
      return response.json({
         message:"Produto Excluído!"
      });
   }
});



export default productsRouter;
