import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = async () => {
  try {
    // Simula a conexão com o banco de dados
    console.log('Conectando ao banco de dados (mock)...');
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um atraso de 1 segundo
    console.log('Conectado ao banco de dados (mock).');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados (mock):', error);
    process.exit(1);
  }
};