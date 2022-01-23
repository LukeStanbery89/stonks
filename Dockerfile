# syntax=docker/dockerfile:1
FROM node:16-alpine
COPY . /app
CMD ["node", "./app/dist/server.bundle.js"]
EXPOSE 3000