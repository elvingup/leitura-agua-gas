import { Leitura } from '../models/Leitura';
import { v4 as uuidv4 } from 'uuid';

export class LeituraService {
  async createLeitura(
    customerCode: string,
    imagemBase64: string,
    dataLeitura: Date,
    tipoLeitura: string
  ): Promise<{ imageUrl: string, measureValue: number, measureUuid: string }> {
    // Gera um GUID para a leitura
    const measureUuid = uuidv4();

    // Gera um link temporário para a imagem
    const imageUrl = `https://api.example.com/images/${measureUuid}`; // Substitua com a lógica real

    // Valor de exemplo para a leitura
    const measureValue = 100;

    // Cria uma nova leitura (sem salvar no banco de dados)
    const novaLeitura = new Leitura({
      customerCode,
      dataLeitura,
      valorLeitura: measureValue,
      imagem: imagemBase64,
      tipoLeitura,
    });

    // Simula a operação de salvar no banco de dados
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um atraso de 1 segundo
    console.log('Leitura salva com sucesso (mock).');

    return { imageUrl, measureValue, measureUuid };
  }

  async confirmLeitura(measureUuid: string, confirmedValue: number): Promise<void> {
    // Busca a leitura (sem buscar no banco de dados)
    const leitura = new Leitura({
      _id: measureUuid,
      valorLeitura: confirmedValue,
      status: 'confirmado',
    });

    // Simula a operação de atualizar no banco de dados
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um atraso de 1 segundo
    console.log('Leitura confirmada com sucesso (mock).');
  }

  async getLeiturasByCustomer(customerCode: string, measureType?: string): Promise<Leitura[]> {
    // Busca as leituras (sem buscar no banco de dados)
    const leituras: Leitura[] = [];

    // Simula a operação de buscar no banco de dados
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um atraso de 1 segundo

    // Lógica para filtrar as leituras (mock)
    if (measureType) {
      const normalizedMeasureType = measureType.toUpperCase();
      leituras.push(new Leitura({
        customerCode,
        dataLeitura: new Date(),
        valorLeitura: 100,
        status: 'pendente',
        imagem: 'base64_image_data',
        tipoLeitura: normalizedMeasureType,
      }));
    } else {
      leituras.push(new Leitura({
        customerCode,
        dataLeitura: new Date(),
        valorLeitura: 100,
        status: 'pendente',
        imagem: 'base64_image_data',
        tipoLeitura: 'WATER',
      }));
      leituras.push(new Leitura({
        customerCode,
        dataLeitura: new Date(),
        valorLeitura: 100,
        status: 'pendente',
        imagem: 'base64_image_data',
        tipoLeitura: 'GAS',
      }));
    }

    return leituras;
  }
}