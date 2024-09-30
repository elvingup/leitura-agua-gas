# Leitura de Consumo de Água e Gás - Teste Técnico
Este repositório contém o código fonte para um teste técnico de Desenvolvimento Web. O projeto consiste em um back-end para gerenciar a leitura individualizada de consumo de água e gás, utilizando Node.js com TypeScript.
**Obs.**: Este projeto foi feito com assistência da I.A. Google Gemini, cujo [código está no arquivo genai.py](/genai/genai.py).

## Funcionalidades:

### Upload de Imagens:
O endpoint POST /upload recebe uma imagem em base64, valida os dados, consulta uma API de LLM (Gemini) para extrair o valor da imagem, gera um GUID e um link temporário para a imagem, e salva a leitura no banco de dados.

### Confirmação ou Correção de Leituras:
O endpoint PATCH /confirm permite confirmar ou corrigir o valor lido pelo LLM.

### Listagem de Leituras:
O endpoint GET /<customer code>/list lista as medidas realizadas por um determinado cliente, com a opção de filtrar por tipo de medição (WATER ou GAS).

### Tecnologias Utilizadas:
- Node.js
- TypeScript
- Express.js
- Mongoose (mock)
- Docker

### Instruções de Execução:
- Instalar as dependências: `npm install`
- Construir a imagem Docker: `docker build -t shopper`
- Iniciar o container Docker: `docker run -p 3000:3000 shopper`
