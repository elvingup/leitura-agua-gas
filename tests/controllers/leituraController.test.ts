import { LeituraController } from '../../src/controllers/leituraController';
import { LeituraService } from '../../src/services/leituraService';
import { Leitura } from '../../src/models/Leitura';
import { Request, Response } from 'express';

jest.mock('../../src/services/leituraService');

describe('LeituraController', () => {
  let leituraController: LeituraController;
  let leituraService: LeituraService;

  beforeEach(() => {
    leituraService = new LeituraService();
    leituraController = new LeituraController();
  });

  it('should create a new leitura', async () => {
    const req = { body: { customerCode: '123', imagemBase64: 'base64', measure_datetime: '2023-10-26T10:00:00.000Z', measure_type: 'WATER' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Mock da função createLeitura do serviço LeituraService
    (leituraService.createLeitura as jest.Mock).mockResolvedValue({
      imageUrl: 'https://api.example.com/images/123e4567-e89b-12d3-a456-426614174000',
      measureValue: 100,
      measureUuid: '123e4567-e89b-12d3-a456-426614174000',
    });

    await leituraController.upload(req as Request, res as Response);

    expect(leituraService.createLeitura).toHaveBeenCalledWith('123', 'base64', new Date('2023-10-26T10:00:00.000Z'), 'WATER');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      imageUrl: 'https://api.example.com/images/123e4567-e89b-12d3-a456-426614174000',
      measureValue: 100,
      measureUuid: '123e4567-e89b-12d3-a456-426614174000',
    });
  });

  it('should confirm a leitura', async () => {
    const req = { body: { measure_uuid: '123e4567-e89b-12d3-a456-426614174000', confirmed_value: 150 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Mock da função confirmLeitura do serviço LeituraService
    (leituraService.confirmLeitura as jest.Mock).mockResolvedValue(undefined);

    await leituraController.confirm(req as Request, res as Response);

    expect(leituraService.confirmLeitura).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000', 150);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it('should get leituras by customer', async () => {
    const req = { params: { customerCode: '123' }, query: { measure_type: 'WATER' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Mock da função getLeiturasByCustomer do serviço LeituraService
    (leituraService.getLeiturasByCustomer as jest.Mock).mockResolvedValue([
      new Leitura({
        customerCode: '123',
        dataLeitura: new Date(),
        valorLeitura: 100,
        status: 'pendente',
        imagem: 'base64_image_data',
        tipoLeitura: 'WATER',
      }),
    ]);

    await leituraController.list(req as Request, res as Response);

    expect(leituraService.getLeiturasByCustomer).toHaveBeenCalledWith('123', 'WATER');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      customer_code: '123',
      measures: [
        {
          measure_uuid: expect.any(String),
          measure_datetime: expect.any(Date),
          measure_type: 'WATER',
          has_confirmed: false,
          image_url: expect.any(String),
        },
      ],
    });
  });
});