import { getRepository } from 'typeorm';
import Client from '../models/Client';

interface Request{
   name: string;
   phone: string;
}

class ClientService{
   public async execute({name, phone}: Request): Promise<Client>{
      const clientsRepository = getRepository(Client);
      const client = clientsRepository.create({
         name,
         phone
      });
      await clientsRepository.save(client);
      return client;
   }
}

export default ClientService;
