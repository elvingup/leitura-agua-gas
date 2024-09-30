import { Request, Response } from 'express';
import { LeituraService } from '../services/leituraService';

export class LeituraController {
  private leituraService: LeituraService;

  constructor() {
    this.leituraService = new LeituraService();
  }

  async upload(req: Request, res: Response) {
    try {
      const { image, customer_code, measure_datetime, measure_type } = req.body;

      // Validação dos parâmetros
      if (!image || !customer_code || !measure_datetime || !measure_type) {
        return res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description: 'Parâmetros inválidos.',
        });
      }

      const dataLeitura = new Date(measure_datetime);
      const tipoLeitura = measure_type.toUpperCase();

      const result = await this.leituraService.createLeitura(
        customer_code,
        image,
        dataLeitura,
        tipoLeitura
      );

      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        error_code: 'INTERNAL_ERROR',
        error_description: 'Erro interno do servidor.',
      });
    }
  }

  async confirm(req: Request, res: Response) {
    try {
      const { measure_uuid, confirmed_value } = req.body;

      // Validação dos parâmetros
      if (!measure_uuid || !confirmed_value) {
        return res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description: 'Parâmetros inválidos.',
        });
      }

      await this.leituraService.confirmLeitura(measure_uuid, confirmed_value);

      res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({
        error_code: 'INTERNAL_ERROR',
        error_description: 'Erro interno do servidor.',
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { customerCode } = req.params;
      const { measure_type } = req.query;

      const leituras = await this.leituraService.getLeiturasByCustomer(customerCode, measure_type as string);

      const response = {
        customer_code: customerCode,
        measures: leituras.map((leitura) => ({
          measure_uuid: leitura._id,
          measure_datetime: leitura.dataLeitura,
          measure_type: leitura.tipoLeitura,
          has_confirmed: leitura.status === 'confirmado' || leitura.status === 'corrigido',
          image_url: `https://api.example.com/images/${leitura._id}`, // Substitua com a lógica real
        })),
      };

      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        error_code: 'INTERNAL_ERROR',
        error_description: 'Erro interno do servidor.',
      });
    }
  }
}