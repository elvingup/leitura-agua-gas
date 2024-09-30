import dotenv from 'dotenv';
dotenv.config();

export class Gemini {
  /**
   * Simula a consulta à API do Gemini e retorna um valor de leitura
   * @param imagemBase64 imagem em base64 para ser enviada para a API do Gemini
   * @returns um valor de leitura mockado
   */
    static async getMedida(imagemBase64: string): Promise<number> {
      // Simula a consulta à API do Gemini
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um atraso de 1 segundo
      console.log('Consultando API do Gemini (mock)...');

       // Utiliza a chave da API do Gemini
      console.log(`Chave da API do Gemini: ${process.env.GEMINI_API_KEY}`);
  
      // Retorna um valor de exemplo
      return 100;
    }
  }
  
  /**
   * Verifica se a string é válida em base64
   * @param base64String string em base64 para ser verificada
   * @returns true se a string for válida em base64, false caso contrário
   */
  export const validateBase64 = (base64String: string): boolean => {
    // Verifica se a string é válida em base64
    const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return regex.test(base64String);
  };
  
  /**
   * Gera um link temporário para a imagem
   * @param measureUuid o UUID da leitura
   * @returns um link temporário para a imagem
   */
  export const generateTemporaryLink = (measureUuid: string): string => {
    // Gera um link temporário para a imagem
    return `https://api.example.com/images/${measureUuid}`; // Substitua com a lógica real
  };