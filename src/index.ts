import express from 'express';
import leituraRoutes from './routes/leituraRoutes';
import { connectDatabase } from './database/connection';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/leituras', leituraRoutes);

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});