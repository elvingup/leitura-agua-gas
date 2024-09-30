import { Leitura } from '../../src/models/Leitura';

describe('Leitura Model', () => {
  it('should create a new Leitura instance', () => {
    const leitura = new Leitura({
      customerCode: '12345',
      dataLeitura: new Date(),
      valorLeitura: 100,
      status: 'pendente',
      imagem: 'base64_image_data',
      tipoLeitura: 'WATER',
    });

    expect(leitura.customerCode).toBe('12345');
    expect(leitura.dataLeitura).toBeInstanceOf(Date);
    expect(leitura.valorLeitura).toBe(100);
    expect(leitura.status).toBe('pendente');
    expect(leitura.imagem).toBe('base64_image_data');
    expect(leitura.tipoLeitura).toBe('WATER');
  });
});