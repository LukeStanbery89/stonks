# syntax=docker/dockerfile:1
FROM node:16-alpine
COPY . /app
CMD ["node", "/app/."]
EXPOSE 3000