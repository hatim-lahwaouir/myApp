FROM node:20

COPY --chmod=666 app/package.json .
RUN npm install
WORKDIR /app
RUN npm update



EXPOSE 3000

CMD ["npm", "run", "dev"]
