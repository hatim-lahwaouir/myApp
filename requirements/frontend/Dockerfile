FROM node:20

COPY --chmod=666 ./app/package*.json .
RUN npm install

COPY --chmod=666 app /app
WORKDIR /app




EXPOSE 3000

CMD ["npm", "run", "dev"]
