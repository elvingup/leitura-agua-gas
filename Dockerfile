# Base da imagem
FROM node:16-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código fonte para o container
COPY . .

# Define o comando para executar a aplicação
CMD ["npm", "run", "start"]

# Define a variável de ambiente para a chave da API do Gemini
ENV GEMINI_API_KEY=$GEMINI_API_KEY