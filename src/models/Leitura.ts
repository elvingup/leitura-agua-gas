import { Schema, model } from 'mongoose';

const leituraSchema = new Schema({
  customerCode: { type: String, required: true },
  dataLeitura: { type: Date, required: true },
  valorLeitura: { type: Number, required: true },
  status: { type: String, enum: ['pendente', 'confirmado', 'corrigido'], default: 'pendente' },
  imagem: { type: String },
  tipoLeitura: { type: String, enum: ['WATER', 'GAS'], required: true },
});

export const Leitura = model('Leitura', leituraSchema);