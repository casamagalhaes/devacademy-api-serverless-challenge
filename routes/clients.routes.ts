import ClientService from '../services/ClientService';
import {Router} from 'express';
import { getRepository, Like } from 'typeorm';
import Client from '../models/Client';


const clientsRouter = Router();

clientsRouter.get('/', async (request, response, next)=>{
   const clientsRepository = getRepository(Client);
   const clients = await clientsRepository.find();

   return response.json(clients);
});
clientsRouter.get('/:id', async(request, response)=>{
   const {id} = request.params;
   const clientsRepository = getRepository(Client);
   const client = await clientsRepository.findOne({id})

   return response.json(client);
})

//Faltando concluir a apresentação dos dados
clientsRouter.get('/:filter', async(request, response)=>{
   const {filter} = request.params;
   const clientsRepository = getRepository(Client);
   const client = await clientsRepository.find({
         select:["id","name","phone"],
         where:{
            name: filter
         }
   });
   console.log(client)

   return response.json(client);

})

clientsRouter.post('/', async (request, response, next)=>{
      const {name, phone} = request.body;
      const createClient = new ClientService();

      const client = await createClient.execute({
         name,
         phone
      });
      return response.json(client);
});

clientsRouter.put('/:id', async (request, response) =>{
   const clientsRepository = getRepository(Client);
   const{id} = request.params;
   const {name, phone} = request.body;
   const productIndex = clientsRepository.findOne(id);
   if(!productIndex){
      return response.status(400).json({
         error: 'Cliente não encontrado!'
      });
   }else{
      await clientsRepository.update(id,{
         name,
         phone
      });
      return response.json({
         message: "Cliente Alterado!"
      });
   }
});

clientsRouter.delete('/:id', async (request, response) =>{
   const clientsRepository = getRepository(Client);
   const{id} = request.params;
   const clientIndex = clientsRepository.findOne(id);
   if(!clientIndex){
      return response.status(400).json({
         error: 'Cliente não encontrado!'
      });
   }else{
      await clientsRepository.delete(id);
      return response.json({
         message:"Cliente Excluído!"
      });
   }
});

export default clientsRouter;
