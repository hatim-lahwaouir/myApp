FROM  node:lts-alpine3.20


RUN apk add npm

COPY --chmod=666 ./app/ /
WORKDIR /app
RUN  npm i

EXPOSE 5173

ENTRYPOINT [ "npm" , "run", "dev"]
