FROM node:18-alpine3.16

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY prisma/schema.prisma ./prisma/

RUN npx prisma generate

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]