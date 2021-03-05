import 'reflect-metadata';
import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import routes from './routes';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) =>{
   if(err instanceof AppError){
      return response.status(err.statusCode).json({
         status: 'error',
         message: err.message
      });
   }
   return response.status(500).json({
      status: 'error',
      message: 'Erro interno no servidor'
   })
});

app.listen(3000, () =>{
   console.log("Servidor inicado na porta 3000!");
})
