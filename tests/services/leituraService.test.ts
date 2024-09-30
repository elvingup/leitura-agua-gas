import { LeituraService } from '../../src/services/leituraService';
import { Leitura } from '../../src/models/Leitura';
import { v4 as uuidv4 } from 'uuid';

jest.mock('../../src/models/Leitura');

const LeituraMock = jest.requireMock('../../src/models/Leitura');

describe('LeituraService', () => {
  let leituraService: LeituraService;

  beforeEach(() => {
    leituraService = new LeituraService();
  });

  it('should create a new leitura', async () => {
    const customerCode = '12345';
    const imagemBase64 = 'base64_image_data';
    const dataLeitura = new Date();
    const tipoLeitura = 'WATER';

    const measureUuid = uuidv4();
    const imageUrl = `https://api.example.com/images/${measureUuid}`;
    const measureValue = 100;

    // Mock da função save do modelo Leitura
    (LeituraMock as jest.Mock).mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: measureUuid,
        customerCode,
        dataLeitura,
        valorLeitura: measureValue,
        imagem: imagemBase64,
        tipoLeitura,
      }),
    }));

    const result = await leituraService.createLeitura(
      customerCode,
      imagemBase64,
      dataLeitura,
      tipoLeitura
    );

    expect(result.measureUuid).toBe(measureUuid);
    expect(result.imageUrl).toBe(imageUrl);
    expect(result.measureValue).toBe(measureValue);
    expect(Leitura).toHaveBeenCalledWith({
      customerCode,
      dataLeitura,
      valorLeitura: measureValue,
      imagem: imagemBase64,
      tipoLeitura,
    });
    expect(LeituraMock.mock.instances[0].save).toHaveBeenCalled();
  });

  it('should confirm a leitura', async () => {
    const measureUuid = '123e4567-e89b-12d3-a456-426614174000';
    const confirmedValue = 150;

    // Mock da função save do modelo Leitura
    (LeituraMock as jest.Mock).mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: measureUuid,
        valorLeitura: confirmedValue,
        status: 'confirmado',
      }),
    }));

    await leituraService.confirmLeitura(measureUuid, confirmedValue);

    expect(Leitura).toHaveBeenCalledWith({
      _id: measureUuid,
      valorLeitura: confirmedValue,
      status: 'confirmado',
    });
    expect(LeituraMock.mock.instances[0].save).toHaveBeenCalled();
  });

  it('should get leituras by customer', async () => {
    const customerCode = '12345';
    const measureType = 'WATER';

    // Mock da função find do modelo Leitura
    (LeituraMock as jest.Mock).mockImplementation(() => ({
      find: jest.fn().mockResolvedValue([
        new Leitura({
          customerCode,
          dataLeitura: new Date(),
          valorLeitura: 100,
          status: 'pendente',
          imagem: 'base64_image_data',
          tipoLeitura: measureType,
        }),
      ]),
    }));

    const leituras = await leituraService.getLeiturasByCustomer(customerCode, measureType);

    expect(leituras.length).toBe(1);
    expect(leituras[0].customerCode).toBe(customerCode);
    expect(leituras[0].tipoLeitura).toBe(measureType);
    expect(Leitura.find).toHaveBeenCalledWith({ customerCode, tipoLeitura: measureType });
  });
});